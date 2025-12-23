"use client";

import { useEffect, useState } from "react";

interface FacePalmMeterProps {
    joke: string;
}

export default function FacePalmMeter({ joke }: FacePalmMeterProps) {
    const [score, setScore] = useState(0);
    const [label, setLabel] = useState("");

    useEffect(() => {
        if (!joke) {
            setScore(0);
            setLabel("");
            return;
        }

        // Deterministic hasing to get a score between 0 and 100
        let hash = 0;
        for (let i = 0; i < joke.length; i++) {
            const char = joke.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        const positiveHash = Math.abs(hash);
        const calculatedScore = (positiveHash % 60) + 40; // Ensure score is between 40 and 100 for better effect

        setScore(calculatedScore);

        if (calculatedScore < 55) {
            setLabel("Mild Chuckle 😐");
        } else if (calculatedScore < 70) {
            setLabel("Groan Worthy 🙄");
        } else if (calculatedScore < 85) {
            setLabel("Major Face Palm 🤦");
        } else {
            setLabel("Dad Level: 9000 🧔");
        }
    }, [joke]);

    return (
        <div className="face-palm-meter">
            <div className="meter-header">
                <span className="meter-title">Face Palm Meter</span>
                <span className="meter-score">{label}</span>
            </div>
            <div className="meter-track">
                <div
                    className="meter-fill"
                    style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}
                ></div>
            </div>
        </div>
    );
}

function getScoreColor(score: number): string {
    if (score < 55) return "#4ade80"; // green
    if (score < 70) return "#facc15"; // yellow
    if (score < 85) return "#fb923c"; // orange
    return "#f87171"; // red
}
