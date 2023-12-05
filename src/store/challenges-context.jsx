import { createContext, useState, useEffect } from "react";

import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.jsx";

export const ChallengesContext = createContext({
  challenges: [],
  getChallenges: () => {},
  addChallenge: () => {},
  challengeEdit: () => {},
  updateChallengeStatus: () => {},
});

export default function ChallengesContextProvider({ children }) {
  const [challenges, setChallenges] = useState([]);

  const getChallenges = async () => {
    const querySnapshot = await getDocs(collection(db, "challenges"));
    const loadedChallenges = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChallenges(loadedChallenges);
  };

  useEffect(() => {
    getChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(challenges);

  // useEffect(() => {
  //   getChallenges();
  // }, [challenges]);

  async function addChallenge(challenge) {
    await addDoc(collection(db, "challenges"), {
      title: challenge.title,
      description: challenge.description,
      date: challenge.deadline,
      image: challenge.image.src,
      // status: "active",
      // status:
      // image: challenge.image,
    });

    setChallenges((prevChallenges) => [
      { ...challenge, id: Math.random().toString(), status: "active" },
      ...prevChallenges,
    ]);
    // getChallenges();
    // console.log(challenges);
  }
  async function challengeEdit(selectedChallenge) {
    return console.log(selectedChallenge);
  }
  console.log(challenges);

  function deleteChallenge(challengeId) {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(challengeId, newStatus) {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }

  const challengesContext = {
    challenges,
    // getChallenges,
    addChallenge,
    challengeEdit,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}
