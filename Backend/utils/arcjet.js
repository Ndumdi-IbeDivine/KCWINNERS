import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "../config/env.js";


const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    shield({ mode: "DRY_RUN" }),
    detectBot({
      mode: "DRY_RUN", 
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, 
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;