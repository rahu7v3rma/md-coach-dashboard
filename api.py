from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/client-details-analytics-cards")
def client_details_analytics_cards():
    data = [
        dict(
            title="Glucose",
            color="red",
            chart=dict(
                type="line",
                data=[
                    dict(x="01/02/2024", y=100),
                    dict(x="02/02/2024", y=200),
                    dict(x="03/02/2024", y=None),
                    dict(x="04/02/2024", y=400),
                    dict(x="05/02/2024", y=500),
                ],
            ),
        )
    ]
    return jsonify(data)


@app.get("/testing")
def testing():
    return jsonify(dict(a=1))


if __name__ == "__main__":
    app.run(debug=True)
