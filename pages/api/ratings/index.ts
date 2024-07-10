import { ratingController } from "@/backends/controllers/rating.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") return ratingController.getRatings(req, res);
  else if (req.method == "POST") return ratingController.addRating(req, res);
  else
    return res.status(400).json({
      message: "METHOD NOT ALLOWED",
    });
}
