"use client";

import React, { useState, useEffect, useCallback } from "react";
import WidgetCard from "@/components/widgets/WidgetCard";

type Span = { cols?: 1 | 2 | 3; rows?: 1 | 2 | 3 | 4 };
function spanToClasses(span?: Span): string {
  if (!span) return "";
  const cls: string[] = [];
  if (span.cols === 1) cls.push("col-span-1");
  if (span.cols === 2) cls.push("col-span-2");
  if (span.cols === 3) cls.push("col-span-3");
  if (span.rows === 1) cls.push("row-span-1");
  if (span.rows === 2) cls.push("row-span-2");
  if (span.rows === 3) cls.push("row-span-3");
  if (span.rows === 4) cls.push("row-span-4");
  return cls.join(" ");
}

// Tetris pieces with red color variations
const TETRIS_PIECES = [
  { shape: [[1, 1, 1, 1]], color: "red", bgClass: "bg-red-400", borderClass: "border-red-300" }, // I-piece
  { shape: [[1, 1], [1, 1]], color: "red", bgClass: "bg-red-500", borderClass: "border-red-400" }, // O-piece
  { shape: [[0, 1, 0], [1, 1, 1]], color: "red", bgClass: "bg-red-600", borderClass: "border-red-500" }, // T-piece
  { shape: [[0, 1, 1], [1, 1, 0]], color: "red", bgClass: "bg-red-700", borderClass: "border-red-600" }, // S-piece
  { shape: [[1, 1, 0], [0, 1, 1]], color: "red", bgClass: "bg-red-800", borderClass: "border-red-700" }, // Z-piece
  { shape: [[1, 0, 0], [1, 1, 1]], color: "red", bgClass: "bg-red-900", borderClass: "border-red-800" }, // J-piece
  { shape: [[0, 0, 1], [1, 1, 1]], color: "red", bgClass: "bg-red-300", borderClass: "border-red-200" }, // L-piece
];

const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 12;

type Board = number[][];
type Piece = { shape: number[][]; color: string; bgClass: string; borderClass: string; x: number; y: number };

export default function TetrisWidget({ span }: { span?: Span }) {
  const [board, setBoard] = useState<Board>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'over'>('idle');

  // Generate random piece
  const generatePiece = useCallback((): Piece => {
    const pieceIndex = Math.floor(Math.random() * TETRIS_PIECES.length);
    const piece = TETRIS_PIECES[pieceIndex];
    return {
      ...piece,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0,
    };
  }, []);

  // Check if piece can be placed at position
  const canPlacePiece = useCallback((piece: Piece, newX: number, newY: number): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX] > 0) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Place piece on board
  const placePiece = useCallback((piece: Piece) => {
    const newBoard = board.map(row => [...row]);
    const pieceIndex = TETRIS_PIECES.findIndex(p => p.color === piece.color) + 1; // +1 to avoid 0
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = pieceIndex;
          }
        }
      }
    }
    
    setBoard(newBoard);
  }, [board]);

  // Clear completed lines
  const clearLines = useCallback(() => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell > 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    // Add empty rows at top
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    if (linesCleared > 0) {
      setBoard(newBoard);
      // Traditional Tetris scoring: 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines (Tetris) = 800
      const scoreMap = [0, 100, 300, 500, 800];
      setScore(prev => prev + (scoreMap[linesCleared] || linesCleared * 100));
    }
  }, [board]);

  // Move piece down
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver) return;
    
    if (canPlacePiece(currentPiece, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
    } else {
      // Place piece and generate new one
      placePiece(currentPiece);
      clearLines();
      
      const newPiece = generatePiece();
      if (!canPlacePiece(newPiece, newPiece.x, newPiece.y)) {
        setGameOver(true);
        setIsPlaying(false);
        setGameState('over');
      } else {
        setCurrentPiece(newPiece);
      }
    }
  }, [currentPiece, gameOver, canPlacePiece, placePiece, clearLines, generatePiece]);

  // Move piece horizontally
  const movePiece = useCallback((direction: 'left' | 'right') => {
    if (!currentPiece || gameOver || !isPlaying) return;
    
    const newX = direction === 'left' ? currentPiece.x - 1 : currentPiece.x + 1;
    if (canPlacePiece(currentPiece, newX, currentPiece.y)) {
      setCurrentPiece(prev => prev ? { ...prev, x: newX } : null);
    }
  }, [currentPiece, gameOver, isPlaying, canPlacePiece]);

  // Fast drop piece (soft drop)
  const softDropPiece = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying) return;
    
    if (canPlacePiece(currentPiece, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
      setScore(prev => prev + 1); // Bonus point for soft drop
    }
  }, [currentPiece, gameOver, isPlaying, canPlacePiece]);

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying) return;
    
    // Don't rotate the square piece (O-piece)
    if (currentPiece.color === 'yellow') return;
    
    // Rotate shape 90 degrees clockwise
    const rotatedShape = currentPiece.shape[0].map((_, index) =>
      currentPiece.shape.map(row => row[index]).reverse()
    );
    
    const rotatedPiece = { ...currentPiece, shape: rotatedShape };
    
    // Try to place at current position first
    if (canPlacePiece(rotatedPiece, currentPiece.x, currentPiece.y)) {
      setCurrentPiece(rotatedPiece);
      return;
    }
    
    // Try wall kicks (move left/right to accommodate rotation)
    const kicks = [-1, 1, -2, 2];
    for (const kick of kicks) {
      if (canPlacePiece(rotatedPiece, currentPiece.x + kick, currentPiece.y)) {
        setCurrentPiece({ ...rotatedPiece, x: currentPiece.x + kick });
        return;
      }
    }
  }, [currentPiece, gameOver, isPlaying, canPlacePiece]);

  // Start game
  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(generatePiece());
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setGameState('playing');
  };

  // Keyboard controls
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
          event.preventDefault();
          softDropPiece();
          break;
        case 'ArrowUp':
          event.preventDefault();
          rotatePiece();
          break;
        case ' ': // Spacebar for rotation as alternative
          event.preventDefault();
          rotatePiece();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, movePiece, softDropPiece, rotatePiece]);

  // Game loop
  useEffect(() => {
    if (!isPlaying) return;
    
    const gameLoop = setInterval(() => {
      dropPiece();
    }, 800);
    
    return () => clearInterval(gameLoop);
  }, [isPlaying, dropPiece]);

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display
    if (currentPiece) {
      const currentPieceIndex = TETRIS_PIECES.findIndex(p => p.color === currentPiece.color) + 1;
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = -currentPieceIndex; // Negative for current piece
            }
          }
        }
      }
    }
    
    return displayBoard;
  };

  // Get piece colors for rendering
  const getCellStyle = (cell: number) => {
    if (cell === 0) {
      return 'bg-white/5 border border-white/10';
    }
    
    const pieceIndex = Math.abs(cell) - 1;
    const piece = TETRIS_PIECES[pieceIndex];
    const isCurrentPiece = cell < 0;
    
    if (piece && pieceIndex >= 0 && pieceIndex < TETRIS_PIECES.length) {
      const baseStyle = `${piece.bgClass} border ${piece.borderClass} shadow-md`;
      const currentPieceStyle = isCurrentPiece ? 'shadow-lg ring-1 ring-white/30' : '';
      return `${baseStyle} ${currentPieceStyle}`;
    }
    
    return 'bg-zinc-400 border border-zinc-300 shadow-md';
  };

  const displayBoard = renderBoard();

  return (
    <div className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.4)] ${spanToClasses(span)}`}>
      {/* Game Board - Full Widget */}
      <div 
        className="h-full w-full grid gap-1 p-2"
        style={{ 
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-full h-full rounded-sm transition-all duration-200 ${getCellStyle(cell)}`}
            />
          ))
        )}
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center pointer-events-auto">
          {gameState === 'idle' && (
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
              <div className="text-2xl font-bold text-white">Tetris</div>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
              >
                Play
              </button>
            </div>
          )}
          
          {gameState === 'over' && (
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
              <div className="text-lg font-bold text-red-400">Game Over!</div>
              <div className="text-sm text-zinc-300">Score: {score}</div>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Score overlay when playing */}
      {gameState === 'playing' && (
        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
          <div className="text-xs text-white font-mono">Score: {score}</div>
        </div>
      )}

      {/* Controls overlay when playing */}
      {gameState === 'playing' && (
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
          <div className="text-xs text-zinc-300 font-mono">
            ←→ ↓ ↑
          </div>
        </div>
      )}
    </div>
  );
}
