import LectureCard from "../components/LectureCard";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const LecturePreview = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  const course_uuid = window.location.pathname.split("/")[2];

  const fetchLectures = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/lectures/${course_uuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setLectures(data);
      } else {
        const error = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert("Login expired. Please login again.");
          navigate("/login");
        } else {
          console.log(error.error);
          alert(error.error);
        }
      }
      console.log("Lectures fetched");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createLecture = useCallback(
    async (lectureDate) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/lecture/create`,
          {
            method: "POST",
            body: JSON.stringify({
              lectureDate: lectureDate,
              courseUUID: course_uuid,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          fetchLectures();

          navigate(`/link/${data.uuid}`);
        } else {
          const error = await response.json();

          if (response.status === 401) {
            localStorage.removeItem("token");
            alert("Login expired. Please login again.");
            navigate("/login");
          } else {
            alert(error.error);
            console.log(error.error);
          }
        }
        console.log("Lecture created");
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [course_uuid, fetchLectures, navigate]
  );

  useEffect(() => {
    console.log("Fetching lectures");
    fetchLectures();
  }, []);

  const addLecture = async () => {
    console.log("Adding new lecture");

    setLoading(true);

    const date = new Date();
    const lectureDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;

    await createLecture(lectureDate);

    setLoading(false);
  };

  const lectureCode =
    lectures.length > 0 ? lectures[0].course_id : "getLecCode";

  return (
    <div className="lecture-preview">
      <h2>
        Lecture Statistics / <span className="lecture-code">{lectureCode}</span>{" "}
      </h2>
      <div className="lecture-card-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          lectures.map((lecture) => (
            <LectureCard
              key={lecture.uuid}
              lecture={lecture}
              lecture_uuid={lecture.uuid}
              lectureCode={lecture.course_id}
              courseName={lecture.course_name}
              lectureDate={lecture.lecture_date}
            />
          ))
        )}
      </div>
      <div className="new-lecture">
        <button
          onClick={(e) => {
            addLecture();
          }}
        >
          New Lecture
        </button>
      </div>
    </div>
  );
};

export default LecturePreview;
