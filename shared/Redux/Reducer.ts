import {
  ActionReducerMapBuilder,
  createSlice,
  Reducer as RTKReducer,
} from "@reduxjs/toolkit";

export abstract class Reducer<State> {
  constructor(
    private readonly initialState: State,
    private readonly name: string
  ) {}

  protected abstract actions(
    builder: ActionReducerMapBuilder<State>
  ): ActionReducerMapBuilder<State>;

  public build(): RTKReducer<State> {
    return createSlice({
      initialState: this.initialState,
      name: this.name,
      reducers: {},
      extraReducers: this.actions,
    }).reducer;
  }
}
