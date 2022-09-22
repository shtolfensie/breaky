export type BreakAction = "skip" | "break_short" | "break_full";

export type Break = {
  id: number;
  prompt_datetime: Date;
  click_datetime: Date;
  action: BreakAction;
}
