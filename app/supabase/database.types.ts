export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Card: {
        Row: {
          color: string
          id: string
          name: string
          points_id: string | null
          store_id: string | null
          user_id: string | null
        }
        Insert: {
          color: string
          id: string
          name: string
          points_id?: string | null
          store_id?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string
          id?: string
          name?: string
          points_id?: string | null
          store_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Card_points_id_fkey"
            columns: ["points_id"]
            isOneToOne: false
            referencedRelation: "RewardPoint"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Card_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "Store"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Card_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Employee: {
        Row: {
          firstname: string
          id: string
          internalnumber: string
          lastname: string
          profilepicture: string | null
          role: Database["public"]["Enums"]["role"]
          store_id: string | null
        }
        Insert: {
          firstname: string
          id: string
          internalnumber: string
          lastname: string
          profilepicture?: string | null
          role: Database["public"]["Enums"]["role"]
          store_id?: string | null
        }
        Update: {
          firstname?: string
          id?: string
          internalnumber?: string
          lastname?: string
          profilepicture?: string | null
          role?: Database["public"]["Enums"]["role"]
          store_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Employee_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "Store"
            referencedColumns: ["id"]
          },
        ]
      }
      ReademableReward: {
        Row: {
          cost: number
          description: string
          expirydate: string
          id: string
          image: string | null
          maxredeemcount: number
          name: string
          redeemedcount: number
          store_id: string | null
        }
        Insert: {
          cost: number
          description: string
          expirydate: string
          id: string
          image?: string | null
          maxredeemcount: number
          name: string
          redeemedcount?: number
          store_id?: string | null
        }
        Update: {
          cost?: number
          description?: string
          expirydate?: string
          id?: string
          image?: string | null
          maxredeemcount?: number
          name?: string
          redeemedcount?: number
          store_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ReademableReward_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "Store"
            referencedColumns: ["id"]
          },
        ]
      }
      RewardPoint: {
        Row: {
          amount: number
          card_id: string | null
          id: string
        }
        Insert: {
          amount?: number
          card_id?: string | null
          id: string
        }
        Update: {
          amount?: number
          card_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "RewardPoint_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "Card"
            referencedColumns: ["id"]
          },
        ]
      }
      Store: {
        Row: {
          color: string | null
          email: string
          id: string
          location: unknown | null
          logo: string | null
          name: string
          phone: string
        }
        Insert: {
          color?: string | null
          email: string
          id: string
          location?: unknown | null
          logo?: string | null
          name: string
          phone: string
        }
        Update: {
          color?: string | null
          email?: string
          id?: string
          location?: unknown | null
          logo?: string | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
      TimeInterval: {
        Row: {
          closing: string
          id: string
          opening: string
          store_id: string | null
          weekday: string
        }
        Insert: {
          closing: string
          id: string
          opening: string
          store_id?: string | null
          weekday: string
        }
        Update: {
          closing?: string
          id?: string
          opening?: string
          store_id?: string | null
          weekday?: string
        }
        Relationships: [
          {
            foreignKeyName: "TimeInterval_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "Store"
            referencedColumns: ["id"]
          },
        ]
      }
      TransactionHistory: {
        Row: {
          amount: number
          card_id: string | null
          description: string
          employee_id: string | null
          id: string
          location: unknown | null
          transactiontype: Database["public"]["Enums"]["transactiontype"]
        }
        Insert: {
          amount: number
          card_id?: string | null
          description: string
          employee_id?: string | null
          id: string
          location?: unknown | null
          transactiontype: Database["public"]["Enums"]["transactiontype"]
        }
        Update: {
          amount?: number
          card_id?: string | null
          description?: string
          employee_id?: string | null
          id?: string
          location?: unknown | null
          transactiontype?: Database["public"]["Enums"]["transactiontype"]
        }
        Relationships: [
          {
            foreignKeyName: "TransactionHistory_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "Card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TransactionHistory_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "Employee"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          firstname: string
          id: string
          isactive: boolean
          isdarkmode: boolean
          languagelocale: Database["public"]["Enums"]["locale"]
          lastname: string
          profilepicture: string
        }
        Insert: {
          firstname: string
          id: string
          isactive: boolean
          isdarkmode: boolean
          languagelocale: Database["public"]["Enums"]["locale"]
          lastname: string
          profilepicture: string
        }
        Update: {
          firstname?: string
          id?: string
          isactive?: boolean
          isdarkmode?: boolean
          languagelocale?: Database["public"]["Enums"]["locale"]
          lastname?: string
          profilepicture?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      locale: "en" | "de"
      role: "Admin" | "Cashier"
      transactiontype: "Reward" | "Purchase"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
