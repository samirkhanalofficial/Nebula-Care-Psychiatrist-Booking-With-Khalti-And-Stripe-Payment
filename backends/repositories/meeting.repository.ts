import { MeetingType } from "../types/meeting.type";
import { Meeting } from "@/backends/models/meeting.model";
class MeetingRepository {
  constructor() {}
  addMeeting = async (meeting: MeetingType) => {
    const meetingData = new Meeting(meeting);
    await meetingData.save();
    return meetingData;
  };
  verifyMeeting = async (id: string) => {
    const meeting = await Meeting.findByIdAndUpdate(id, { paid: true });
    return meeting;
  };
  getAllMeeting = async () => {
    const meeting = await Meeting.find()
      .sort({ _id: -1 })
      .populate(["doctor", "client"]);
    return meeting;
  };
  getMeetingById = async (id: string) => {
    const meeting = await Meeting.findById(id).populate(["doctor", "client"]);
    return meeting;
  };
  getClientMeetings = async (id: string) => {
    const meetings = await Meeting.find({ client: id })
      .sort({ _id: -1 })

      .populate(["doctor", "client"]);
    return meetings;
  };
  getDoctorMeetings = async (id: string) => {
    const meetings = await Meeting.find({ doctor: id })
      .sort({ _id: -1 })
      .populate(["doctor", "client"]);
    return meetings;
  };
  addMedicine = async (id: string, medicine: string) => {
    const meetings = await Meeting.findById(id);
    const newMeetings = await Meeting.findByIdAndUpdate(id, {
      medicines: [...meetings.medicines, medicine],
    });
    return newMeetings;
  };
  deleteMedicine = async (id: string, medicine: string) => {
    const meeting = await Meeting.findById(id);
    const newMeeting = await Meeting.findByIdAndUpdate(id, {
      medicines: meeting.medicines.filter((m: any) => m != medicine),
    });
    return newMeeting;
  };
}
const meetingRepository = new MeetingRepository();
export { MeetingRepository, meetingRepository };
