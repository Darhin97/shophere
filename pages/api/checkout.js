import { initMongoose } from "../../lib/mongoose";

export default async function handler(req, res) {
  initMongoose();

  if (req.method !== "POST") {
  }
}
