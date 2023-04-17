import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
  //Form state
  const [name, setName] = useState({ description: "" });
  const [phone, setPhone] = useState({ phoneNumber: "" });
  const [cardModel, setCardModel] = useState({ cardModel: "" });
  const [idNumber, setIdNumber] = useState({ idNumber: "" });
  const [freeSpace, setFreeSpace] = useState({ freeSpace: "" });
  const [price, setPrice] = useState({ price: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();
    //Run checks for description
    if (!name.description) {
      toast.error("Full Name field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (!phone.phoneNumber) {
      toast.error("Phone Number field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (!cardModel.cardModel) {
      toast.error("Phone Number field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (!idNumber.idNumber) {
      toast.error("ID Number field empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (name?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", name.id);
      const updatedPost = {
        ...name,
        ...phone,
        ...idNumber,
        ...cardModel,
        ...freeSpace,
        ...price,
        timestamp: serverTimestamp(),
      };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      //Make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...name,
        ...phone,
        ...idNumber,
        ...cardModel,
        ...freeSpace,
        ...price,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setName({ description: "" });
      setPhone({ phoneNumber: "" });
      setCardModel({ cardModel: "" });
      setIdNumber({ idNumber: "" });
      setFreeSpace({ freeSpace: "" });
      setPrice({ price: "" });
      toast.success("Post has been made 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  //Check our user
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setName({ description: routeData.description, id: routeData.id });
      setPhone({ phoneNumber: routeData.phoneNumber, id: routeData.id });
      setCardModel({ cardModel: routeData.cardModel, id: routeData.id });
      setIdNumber({ idNumber: routeData.idNumber, id: routeData.id });
      setFreeSpace({ freeSpace: routeData.freeSpace, id: routeData.id });
      setPrice({ price: routeData.freeSpace, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <from onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {name.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <form className="py-2">
          <div>
            <h3 className="text-lg font-medium py-2">ሙሉ ስም፡</h3>
            <input
              placeholder="ሙሉ ስም"
              value={name.description}
              onChange={(e) =>
                setName({
                  ...name,
                  description: e.target.value,
                })
              }
              className="bg-gray-800 h-[60px] w-full text-white rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium py-2">ስልክ ቁጥር፡</h3>
            <input
              placeholder="ስልክ ቁጥር"
              value={phone.phoneNumber}
              onChange={(e) =>
                setPhone({
                  ...phone,
                  phoneNumber: e.target.value,
                })
              }
              className="bg-gray-800 h-[60px] w-full text-white rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium py-2">የተሽከርካሪ አይነት</h3>
            <input
              placeholder="የተሽከርካሪ አይነት"
              value={cardModel.cardModel}
              onChange={(e) =>
                setCardModel({
                  ...cardModel,

                  cardModel: e.target.value,
                })
              }
              className="bg-gray-800 h-[60px] w-full text-white rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium py-2">የታርጋ ቁጥር፡</h3>
            <input
              placeholder="የታርጋ ቁጥር"
              value={idNumber.idNumber}
              onChange={(e) =>
                setIdNumber({
                  ...idNumber,

                  idNumber: e.target.value,
                })
              }
              className="bg-gray-800 h-[60px] w-full text-white rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium py-2">ክፍት ቦታ፡</h3>
            <input
              placeholder="ክፍት ቦታ"
              value={freeSpace.freeSpace}
              onChange={(e) =>
                setFreeSpace({
                  ...freeSpace,

                  freeSpace: e.target.value,
                })
              }
              className="bg-gray-800 h-[60px] w-full text-white rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium py-2">ዋጋ፡</h3>
            <input
              placeholder="ክፍት ቦታ"
              value={price.price}
              onChange={(e) =>
                setPrice({
                  ...price,

                  price: e.target.value,
                })
              }
              className="bg-gray-800 h-[60px] w-full text-white rounded-lg p-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
          >
            Submit
          </button>
        </form>
      </from>
    </div>
  );
}
