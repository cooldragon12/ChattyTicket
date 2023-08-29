export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Entry: {
        Row: {
          date_created: string | null
          emotion: string | null
          id: number
          player_id: number
          screenshot: string | null
          toxicity: string | null
        }
        Insert: {
          date_created?: string | null
          emotion?: string | null
          id?: number
          player_id: number
          screenshot?: string | null
          toxicity?: string | null
        }
        Update: {
          date_created?: string | null
          emotion?: string | null
          id?: number
          player_id?: number
          screenshot?: string | null
          toxicity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Entry_player_id_fkey"
            columns: ["player_id"]
            referencedRelation: "PlayerDemography"
            referencedColumns: ["id"]
          }
        ]
      }
      PlayerDemography: {
        Row: {
          age: number | null
          average_hours: number | null
          country: string | null
          email: string
          emotion: string | null
          frequency: number | null
          gender: string | null
          id: number
          in_game_rank: string | null
          in_game_rank_level: number | null
          name: string | null
          often_server: string | null
          province: string | null
          responding_to_behavior: string | null
        }
        Insert: {
          age?: number | null
          average_hours?: number | null
          country?: string | null
          email: string
          emotion?: string | null
          frequency?: number | null
          gender?: string | null
          id?: number
          in_game_rank?: string | null
          in_game_rank_level?: number | null
          name?: string | null
          often_server?: string | null
          province?: string | null
          responding_to_behavior?: string | null
        }
        Update: {
          age?: number | null
          average_hours?: number | null
          country?: string | null
          email?: string
          emotion?: string | null
          frequency?: number | null
          gender?: string | null
          id?: number
          in_game_rank?: string | null
          in_game_rank_level?: number | null
          name?: string | null
          often_server?: string | null
          province?: string | null
          responding_to_behavior?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
