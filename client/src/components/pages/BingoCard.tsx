import { useEffect, useState } from "react";
import { getBingoCardByUserId } from "../../clients/bingoCardsService";

type RowProps = {
  rowIndex: number;
  row: number[];
};

function Row({ row, rowIndex }: RowProps) {
  return (
    <div className="flex flex-row gap-[8px]">
      {row.map((cell, cellIndex) =>
        (rowIndex === 2 && cellIndex === 2) || cell === -1 ? (
          <div className="flex flex-col items-center justify-center w-[30px] h-[30px] text-white bg-white rounded-full" />
        ) : (
          <div className="flex flex-col items-center justify-center w-[30px] h-[30px] text-white bg-gray-500 rounded-full">
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

  useEffect(() => {
    async function getBoard() {
      const { data } = await getBingoCardByUserId(holder._id);
      setBoard(JSON.parse(data.board));
    }
    getBoard();
  }, [updateCounter]);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[8px] text-l font-bold">{holder.name}'s card</div>
      <div
        className={
          "grid grid-rows-5 grid-flow-col gap-[8px] p-[8px] w-[198px] h-[198px] bg-green-400 " +
          className
        }
      >
        {board.map((row, rowIndex) => {
          return <Row row={row} rowIndex={rowIndex} />;
        })}
      </div>
    </div>
  );
}
