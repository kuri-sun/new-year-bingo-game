import { useEffect, useMemo, useState } from "react";
import { getBingoCardByUserId } from "../../clients/bingoCardsService";
import { BingoCardState, getBingoCardState } from "../../utils/Utility";

type RowProps = {
  id: string;
  rowIndex: number;
  row: number[];
};

function Row({ id, row, rowIndex }: RowProps) {
  return (
    <div className="flex flex-row gap-[8px]">
      {row.map((cell, cellIndex) =>
        (rowIndex === 2 && cellIndex === 2) || cell === -1 ? (
          <div
            key={id + rowIndex + cellIndex}
            className="flex flex-col items-center justify-center w-[30px] h-[30px] text-white bg-white rounded-full"
          />
        ) : (
          <div
            key={id + rowIndex + cellIndex}
            className="flex flex-col items-center justify-center w-[30px] h-[30px] text-white bg-gray-500 rounded-full"
          >
            {cell}
          </div>
        )
      )}
    </div>
  );
}

type BingoCardProps = {
  holder: User;
  className?: string;
  updateCounter: number;
};

export default function BingoCard({
  holder,
  updateCounter,
  className = "",
}: BingoCardProps) {
  const [board, setBoard] = useState<number[][]>([]);
  const bingoCardState: BingoCardState = useMemo(
    () => getBingoCardState(board),
    [board]
  );

  useEffect(() => {
    const getBoard = async () => {
      const { data } = await getBingoCardByUserId(holder._id);
      setBoard(JSON.parse(data.board));
    };
    getBoard();
  }, [updateCounter]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[8px] flex flex-row gap-[8px]">
        <div className="text-l font-bold">{holder.name}'s card</div>
        <BingoCardStateChip state={bingoCardState} />
      </div>
      <div
        className={
          "grid grid-rows-5 grid-flow-col gap-[8px] p-[8px] w-[198px] h-[198px] bg-green-400 " +
          className
        }
      >
        {board.map((row, rowIndex) => {
          return (
            <Row
              key={holder._id + rowIndex.toString()}
              id={holder._id}
              row={row}
              rowIndex={rowIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

type BingoCardStateChipProps = {
  state: BingoCardState;
};

function BingoCardStateChip({ state }: BingoCardStateChipProps) {
  const bgColor = state === "reach" ? "bg-orange-500" : "bg-purple-500";
  if (state === "normal") return <></>;
  return (
    <div className={"px-[8px] rounded-full " + bgColor}>
      <div className="text-white font-semibold">
        {state === "reach" ? "Reach" : "Won"}
      </div>
    </div>
  );
}
