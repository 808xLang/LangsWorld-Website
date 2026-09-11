import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const [purchasedBeat, setPurchasedBeat] = useState<{ beatName: string; beatUrl: string } | null>(null);
  const [status, setStatus] = useState<"loading" | "verified" | "failed">("loading");
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (!session_id || typeof session_id !== "string") return;

    fetch(`/api/verify-session?session_id=${session_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.beatName && data.beatUrl) {
          setPurchasedBeat(data);
          setStatus("verified");
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [session_id]);

  if (status === "loading") return <h1>Verifying your payment...</h1>;

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      {status === "verified" && purchasedBeat ? (
        <div>
          <h2>Your Purchased Beat:</h2>
          <p>{purchasedBeat.beatName}</p>
          <a href={purchasedBeat.beatUrl} download>
            <button>Download</button>
          </a>
        </div>
      ) : (
        <p>We couldn't verify your purchase. If you were charged, contact support.</p>
      )}
    </div>
  );
}