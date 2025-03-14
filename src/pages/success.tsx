import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const [purchasedBeat, setPurchasedBeat] = useState<{ beatName: string; beatUrl: string } | null>(null);
  const router = useRouter();
  const { session_id } = router.query; // Stripe session ID

  useEffect(() => {
    // Retrieve purchased beat from localStorage
    const beatData = localStorage.getItem("purchasedBeat");
    if (beatData) {
      setPurchasedBeat(JSON.parse(beatData));
    }
  }, []);

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      {purchasedBeat ? (
        <div>
          <h2>Your Purchased Beat:</h2>
          <p>{purchasedBeat.beatName}</p>
          <a href={purchasedBeat.beatUrl} download>
            <button>Download</button>
          </a>
        </div>
      ) : (
        <p>No purchased beat found.</p>
      )}
    </div>
  );
}