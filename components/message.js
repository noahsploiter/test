export default function Message({
  children,
  avatar,
  username,
  description,
  phoneNumber,
  idNumber,
  cardModel,
  freeSpace,
  price,
}) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={avatar} className="w-10 rounded-full" />
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p>ስም: {description}</p>
        <p>ስልክ: {phoneNumber}</p>
        <p>የተሽከርካሪ አይነት: {cardModel}</p>
        <p>የታርጋ ቁጥር፡ {idNumber}</p>
        <p>ክፍት ቦታ፡ {freeSpace}</p>
        <p>ዋጋ፡ {price}</p>
      </div>
      {children}
    </div>
  );
}
