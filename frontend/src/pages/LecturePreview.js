import LectureCard from "../components/LectureCard";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LecturePreview = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [lectureCode, setLectureCode] = useState("");
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);

  const course_uuid = window.location.pathname.split("/")[2];

  const fetchCourseID = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/course/id/${course_uuid}`,
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
        console.log(data.course_id);
        setLectureCode(data.course_id);
      } else {
        const error = await response.json();
        if (response.status === 401) {
          localStorage.removeItem("token");
          alert(t("lecturePreview.sessionExpired"));
          navigate("/login");
        } else {
          console.log(error.error);
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchLectures = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/lectures/${course_uuid}`,
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

        fetchCourseID();

        setLectures(data);
      } else {
        const error = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          alert(t("lecturePreview.sessionExpired"));
          navigate("/login");
        } else {
          console.log(error.error);
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
          `${process.env.REACT_APP_API_URL}/lecture/create`,
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
            alert(t("lecturePreview.sessionExpired"));
            navigate("/login");
          } else {
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

  return (
    <div className="lecture-preview">
      <h2>
        {t("lecturePreview.heading")} /{" "}
        <span className="lecture-code">{lectureCode}</span>{" "}
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
          {t("lecturePreview.newLecture")}
        </button>
      </div>
    </div>
  );
};

export default LecturePreview;
