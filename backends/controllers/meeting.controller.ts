import Joi from "joi";
const stripe = require("stripe")(process.env.STRIPE_KEY);

import { NextApiRequest, NextApiResponse } from "next";
import { authService, AuthService } from "../services/auth.service";
import { meetingService, MeetingService } from "../services/meeting.service";
import { userService, UserService } from "../services/user.service";
import { userType } from "../types/user.type";
const addMeetingValidation = Joi.object({
  doctor: Joi.string().required(),
  date: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  time: Joi.string().required(),
});
class MeetingController {
  constructor(
    private readonly meetingService: MeetingService,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}
  addMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const { error, value } = await addMeetingValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    const user: userType = await this.userService.getUserByEmail(payload.email);
    const doctor = await this.userService.getUserById(value.doctor);
    // Sun Jan 15 2023 06:49:23 GMT+0545 (Nepal Time)'
    const meeting = await this.meetingService.addMeeting({
      clientAge: user.age,
      time: value.time,
      date: value.date,
      price: doctor.price,
      client: payload.id,
      doctor: value.doctor,
      clientName: user.fullName,
      doctorName: doctor.fullName,
    });
    if (!meeting)
      return res.status(400).json({ message: "Error adding meeting" });
    const isBooked = await this.meetingService.isBooked(
      value.doctor,
      value.date,
      value.time
    );
    if (isBooked)
      return res
        .status(400)
        .json({ message: "This slot has already been booked." });

    var payment_url = "";
    if (value.paymentMethod == "stripe") {
      let url = encodeURI(
        `${process.env.WEBSITE_URL}/api/admin/meetings/${meeting._id}/verify/`
      );
      const price = parseFloat(meeting.price);
      console.log(price);
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
              // The currency parameter determines which
              // payment methods are used in the Checkout Session.
              currency: "npr",
              product_data: {
                name: "Book a meeting with " + meeting.doctor.name,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${url}?method=stripe`,
        cancel_url: `${process.env.WEBSITE_URL}/psychiatrists/${
          meeting.doctor._id
        }/?success=false&meetingid=${meeting._id.toString()}`,
      });

      console.log(session.url);
      payment_url = session.url;
    } else {
      let url = encodeURI(
        `${process.env.WEBSITE_URL}/api/admin/meetings/${meeting._id}/verify/`
      );

      await fetch(`${process.env.KHALTI_URL}/epayment/initiate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
        },
        body: JSON.stringify({
          return_url: url,
          website_url: `${process.env.WEBSITE_URL}`,
          amount: parseFloat(meeting.price.toString()) * 100,
          purchase_order_id: meeting._id,
          purchase_order_name: `Meeting with ${meeting.doctorName}`,
          customer_info: {
            name: user.fullName,
            email: user.email,
          },
        }),
      })
        .then(async (data) => {
          const resbody = await data.json();
          if (data.status == 200) return resbody;
          throw resbody.detail;
        })
        .then((data) => {
          payment_url = data.payment_url;
        })
        .catch((err) => {
          return res.status(400).json({ message: err });
        });
    }

    res.status(200).json({ ...meeting, payment_url });
  };

  verifyMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const status = req.query.status ?? "";
    const method = req.query.method ?? "khalti";
    const purchase_order_id = req.query.meetingId ?? "";
    const meeting = await this.meetingService.getMeetingById(
      purchase_order_id.toString()
    );
    if (!meeting) return res.redirect("/psychiatrists/");
    if (meeting.paid)
      return res
        .status(400)
        .json({ message: "This meeting has already been booked." });
    const isBooked = await this.meetingService.isBooked(
      meeting.doctor,
      meeting.date,
      meeting.time
    );
    if (isBooked)
      return res
        .status(400)
        .json({ message: "This slot has already been booked." });
    if (method == "khalti") {
      if (status.toString().toLowerCase() == "completed") {
        await this.meetingService.verifyMeeting(purchase_order_id.toString());
        const redirectUrl = `/psychiatrists/${
          meeting.doctor._id
        }/?success=true&meetingid=${purchase_order_id.toString()}`;
        console.log(redirectUrl);
        return res.redirect(redirectUrl);
      } else {
        return res.redirect(
          `/psychiatrists/${
            meeting.doctor._id
          }/?success=false&meetingid=${purchase_order_id.toString()}`
        );
      }
    } else if (method == "stripe") {
      await this.meetingService.verifyMeeting(purchase_order_id.toString());
      return res.redirect(
        `/psychiatrists/${
          meeting.doctor._id
        }/?success=true&meetingid=${purchase_order_id.toString()}`
      );
    } else {
      return res.redirect(
        `/psychiatrists/${
          meeting.doctor._id
        }/?success=false&meetingid=${purchase_order_id.toString()}`
      );
    }
  };
  bookedMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const doctor = req.query.doctor ?? "";
    const date = req.query.date ?? "";

    const meetings = await this.meetingService.bookedSlots(
      doctor.toString(),
      date.toString()
    );
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  getAllMeeting = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "admin") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meetings = await this.meetingService.getAllMeeting();
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  getClientMeetings = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "user") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meetings = await this.meetingService.getClientMeetings(payload.id);
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  getDoctorMeetings = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "psychiatrists") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    const meetings = await this.meetingService.getDoctorMeetings(payload.id);
    if (!meetings)
      return res.status(400).json({ message: "Error getting meetings" });
    res.status(200).json(meetings);
  };
  addMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "psychiatrists") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    if (!req.body.medicine) {
      return res.status(400).json({ message: "Medicine Name Required" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    const meeting = await this.meetingService.getMeetingById(
      req.query?.meetingId!.toString()
    );
    if (!meeting) return res.status(400).json({ message: "meeting not found" });
    if (meeting.doctor != payload.id)
      return res.status(400).json({ message: "Invalid Permission" });
    const medicine = await this.meetingService.addMedicine(
      req.query.meetingId.toString(),
      req.body.medicine
    );
    res.status(200).json(medicine);
  };
  getMeetingById = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    const meeting = await this.meetingService.getMeetingById(
      req.query?.meetingId!.toString()
    );
    if (!meeting) return res.status(400).json({ message: "meeting not found" });
    if (meeting.doctor != payload.id && meeting.client != payload.id)
      return res.status(400).json({ message: "Invalid Permission" });
    res.status(200).json(meeting);
  };
  deleteMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = await this.authService.verifyToken(
      req.headers.authorization!
    );
    if (!payload) {
      return res.status(400).json({ message: "Login error" });
    }
    if (payload.role != "psychiatrists") {
      return res.status(400).json({ message: "Permission Denied" });
    }
    if (!req.body.medicine) {
      return res.status(400).json({ message: "Medicine Name Required" });
    }
    if (!req.query.meetingId) {
      return res.status(400).json({ message: "meetingId Required" });
    }
    const meeting = await this.meetingService.getMeetingById(
      req.query?.meetingId!.toString()
    );
    if (!meeting) return res.status(400).json({ message: "meeting not found" });
    if (meeting.doctor != payload.id)
      return res.status(400).json({ message: "Invalid Permission" });
    const medicine = await this.meetingService.deleteMedicine(
      req.query.meetingId.toString(),
      req.body.medicine
    );
    res.status(200).json(medicine);
  };
}
const meetingController = new MeetingController(
  meetingService,
  authService,
  userService
);
export { MeetingController, meetingController };
