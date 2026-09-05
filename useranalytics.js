import mongoose from "mongoose";

const UserAnalyticsSchema = new mongoose.Schema({
  user_id: Number,
  session_duration: Number,
  pages_viewed: Number,
  time_on_page: Number,
  purchases: Number,
  bounce_rate: Number,
  traffic_source: String,
  country: String,
  segment_label: String
});

export default mongoose.model("UserAnalytics", UserAnalyticsSchema);
