from flask import Flask, request, jsonify
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pickle

app = Flask(__name__)

# Load and preprocess data
def load_data():
    df = pd.read_csv("data/google_analytics_sample.csv")
    df = df.fillna(0)
    le = LabelEncoder()
    df["traffic_source"] = le.fit_transform(df["traffic_source"])
    df["country"] = le.fit_transform(df["country"])
    return df

# ---------- (A) User Segmentation ----------
@app.route('/cluster', methods=['GET'])
def cluster_users():
    df = load_data()
    features = ["session_duration", "pages_viewed", "time_on_page", "bounce_rate", "purchases"]
    X = StandardScaler().fit_transform(df[features])
    kmeans = KMeans(n_clusters=4, random_state=42)
    df["segment"] = kmeans.fit_predict(X)

    # Label segments meaningfully
    labels = {
        0: "High-value customers",
        1: "Window shoppers",
        2: "One-time visitors",
        3: "Frequent buyers"
    }
    df["segment_label"] = df["segment"].map(labels)
    result = df[["user_id", "segment_label"]].to_dict(orient="records")
    return jsonify(result)

# ---------- (B) Predict User Behavior ----------
@app.route('/predict', methods=['POST'])
def predict_behavior():
    df = load_data()
    X = df[["session_duration", "pages_viewed", "time_on_page", "bounce_rate", "traffic_source", "country"]]
    y = (df["purchases"] > 0).astype(int)

    # Train models
    lr = LogisticRegression()
    tree = DecisionTreeClassifier(max_depth=4)
    lr.fit(X, y)
    tree.fit(X, y)

    user_input = request.get_json()
    input_df = pd.DataFrame([user_input])
    pred_lr = lr.predict_proba(input_df)[0][1]
    pred_tree = tree.predict_proba(input_df)[0][1]

    response = {
        "logistic_regression_conversion_probability": round(pred_lr * 100, 2),
        "decision_tree_conversion_probability": round(pred_tree * 100, 2),
        "message": f"This user has {round((pred_lr + pred_tree) / 2 * 100, 2)}% chance to leave without buying."
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
