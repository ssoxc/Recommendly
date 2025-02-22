import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { Database } from "./database.types"

const supabaseUrl = "https://oatdnwshffxmeyauogzm.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdGRud3NoZmZ4bWV5YXVvZ3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzODY3OTAsImV4cCI6MjA1NDk2Mjc5MH0._kkzV7wNt-hXATiNp2SbHlhpwAojvvTtA2DQY8BEbiY"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const setupRewardPointChannel = (
  cardIds: string[],
  userId: string,
  onCardUpdate: (cardId: string, amount: number) => void,
  onCardInsert: (cardId: string) => void,
) => {
  const rewardPointChannel = supabase
    .channel("RewardPoint")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "RewardPoint",
        filter: `card_id=in.(${cardIds.join(",")})`,
      },
      (payload) => {
        console.log("payload", payload)
        const p = payload as unknown as { new: { card_id: string; amount: number } }
        onCardUpdate(p.new.card_id, p.new.amount)
      },
    )
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "RewardPoint",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log("payload in INSERT", payload)
        const p = payload as unknown as { new: { card_id: string } }
        onCardInsert(p.new.card_id)
      },
    )
    .subscribe()

  return () => {
    rewardPointChannel.unsubscribe()
  }
}
