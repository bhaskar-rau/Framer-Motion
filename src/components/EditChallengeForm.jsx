import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.jsx";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function EditChallenge({ onDone, editChallenge }) {
  console.log(editChallenge);
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { challengeEdit, getCourseGoals } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleEditImage() {
    setSelectedImage(editChallenge.image);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };
    await addDoc(collection(db, "challenges"), {
      title: challenge.title,
      description: challenge.description,
      date: challenge.deadline,
      image: challenge.image.src,
      // image: challenge.image,
    });
    getCourseGoals();

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input, textarea",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    onDone();

    challengeEdit(challenge);
  }

  return (
    <Modal onClose={onDone}>
      <form
        id="new-challenge"
        onSubmit={handleSubmit}
        ref={scope}
      >
        <p>
          <label htmlFor="title">Title</label>
          <input
            ref={title}
            type="text"
            name="title"
            defaultValue={editChallenge ? editChallenge.title : ""}
            id="title"
            placeholder="type the title"
          />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea
            ref={description}
            name="description"
            id="description"
            defaultValue={editChallenge ? editChallenge.description : ""}
          />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input
            ref={deadline}
            type="date"
            name="deadline"
            id="deadline"
            defaultValue={editChallenge ? editChallenge.deadline : ""}
          />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={
                selectedImage === image ||
                (editChallenge && image === editChallenge.image)
                  ? "selected"
                  : undefined
              }
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button
            type="button"
            onClick={onDone}
          >
            Cancel
          </button>
          <button>Save Changes</button>
        </p>
      </form>
    </Modal>
  );
}
