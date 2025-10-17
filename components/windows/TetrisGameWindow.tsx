"use client";

import React, { useState, useEffect, useCallback } from "react";

// function spanToClasses(span?: Span): string {
//   if (!span) return "";
//   const cls: string[] = [];
//   if (span.cols === 1) cls.push("col-span-1");
//   if (span.cols === 2) cls.push("col-span-2");
//   if (span.cols === 3) cls.push("col-span-3");
//   if (span.rows === 1) cls.push("row-span-1");
//   if (span.rows === 2) cls.push("row-span-2");
//   if (span.rows === 3) cls.push("row-span-3");
//   if (span.rows === 4) cls.push("row-span-4");
//   return cls.join(" ");
// }

// Tetris pieces with unique colors and IDs
const TETRIS_PIECES = [
  { id: 1, shape: [[1, 1, 1, 1]], color: "red", bgClass: "bg-red-600", borderClass: "border-red-600" }, // I-piece
  { id: 2, shape: [[1, 1], [1, 1]], color: "yellow", bgClass: "bg-yellow-500", borderClass: "border-yellow-500" }, // O-piece
  { id: 3, shape: [[0, 1, 0], [1, 1, 1]], color: "purple", bgClass: "bg-purple-600", borderClass: "border-purple-600" }, // T-piece
  { id: 4, shape: [[0, 1, 1], [1, 1, 0]], color: "green", bgClass: "bg-green-600", borderClass: "border-green-600" }, // S-piece
  { id: 5, shape: [[1, 1, 0], [0, 1, 1]], color: "blue", bgClass: "bg-blue-600", borderClass: "border-blue-600" }, // Z-piece
  { id: 6, shape: [[1, 0, 0], [1, 1, 1]], color: "orange", bgClass: "bg-orange-600", borderClass: "border-orange-600" }, // J-piece
  { id: 7, shape: [[0, 0, 1], [1, 1, 1]], color: "cyan", bgClass: "bg-cyan-600", borderClass: "border-cyan-600" }, // L-piece
];

const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 12;

type Board = number[][];
type Piece = { id: number; shape: number[][]; color: string; bgClass: string; borderClass: string; x: number; y: number };

export default function TetrisGameWindow() {
  const [board, setBoard] = useState<Board>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
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
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => [...row]);
      const pieceIndex = piece.id; // Use the unique ID directly
      
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
      
      return newBoard;
    });
  }, []);

  // Clear completed lines
  const clearLines = useCallback(() => {
    setBoard(prevBoard => {
      let linesCleared = 0;
      const newBoard = prevBoard.filter(row => {
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
        // Traditional Tetris scoring: 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines (Tetris) = 800
        const scoreMap = [0, 100, 300, 500, 800];
        setScore(prev => prev + (scoreMap[linesCleared] || linesCleared * 100));
      }
      
      return newBoard;
    });
  }, []);

  // Move piece down
  const dropPiece = useCallback(() => {
    if (!currentPiece || gameState === 'over') return;
    
    if (canPlacePiece(currentPiece, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
    } else {
      // Place piece and clear lines in one state update
      setBoard(prevBoard => {
        const newBoard = prevBoard.map(row => [...row]);
        const pieceIndex = currentPiece.id;
        
        // Place the piece
        for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
              const boardY = currentPiece.y + y;
              const boardX = currentPiece.x + x;
              if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                newBoard[boardY][boardX] = pieceIndex;
              }
            }
          }
        }
        
        // Clear completed lines
        let linesCleared = 0;
        const filteredBoard = newBoard.filter(row => {
          if (row.every(cell => cell > 0)) {
            linesCleared++;
            return false;
          }
          return true;
        });
        
        // Add empty rows at top
        while (filteredBoard.length < BOARD_HEIGHT) {
          filteredBoard.unshift(Array(BOARD_WIDTH).fill(0));
        }
        
        // Update score if lines were cleared
        if (linesCleared > 0) {
          const scoreMap = [0, 100, 300, 500, 800];
          setScore(prev => prev + (scoreMap[linesCleared] || linesCleared * 100));
        }
        
        return filteredBoard;
      });
      
      const newPiece = generatePiece();
      if (!canPlacePiece(newPiece, newPiece.x, newPiece.y)) {
        setIsPlaying(false);
        setGameState('over');
      } else {
        setCurrentPiece(newPiece);
      }
    }
  }, [currentPiece, gameState, canPlacePiece, generatePiece]);

  // Move piece horizontally
  const movePiece = useCallback((direction: 'left' | 'right') => {
    if (!currentPiece || gameState === 'over' || !isPlaying) return;
    
    const newX = direction === 'left' ? currentPiece.x - 1 : currentPiece.x + 1;
    if (canPlacePiece(currentPiece, newX, currentPiece.y)) {
      setCurrentPiece(prev => prev ? { ...prev, x: newX } : null);
    }
  }, [currentPiece, gameState, isPlaying, canPlacePiece]);

  // Fast drop piece (soft drop)
  const softDropPiece = useCallback(() => {
    if (!currentPiece || gameState === 'over' || !isPlaying) return;
    
    if (canPlacePiece(currentPiece, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
      setScore(prev => prev + 1); // Bonus point for soft drop
    }
  }, [currentPiece, gameState, isPlaying, canPlacePiece]);

  // Rotate piece
  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameState === 'over' || !isPlaying) return;
    
    // Don't rotate the square piece (O-piece) - check by ID or shape
    if (currentPiece.id === 2 || (currentPiece.shape.length === 2 && currentPiece.shape[0].length === 2)) return;
    
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
  }, [currentPiece, gameState, isPlaying, canPlacePiece]);

  // Start game
  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(generatePiece());
    setScore(0);
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

  // Game loop with better state management
  useEffect(() => {
    if (!isPlaying || gameState === 'over') return;
    
    const gameLoop = setInterval(() => {
      dropPiece();
    }, 800);
    
    return () => clearInterval(gameLoop);
  }, [isPlaying, gameState === 'over', dropPiece]);

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display
    if (currentPiece) {
      const currentPieceIndex = currentPiece.id;
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
    
    const isCurrentPiece = cell < 0;
    const baseStyle = 'shadow-md';
    const currentPieceStyle = isCurrentPiece ? 'shadow-lg ring-1 ring-gray-400/50' : '';
    return `${baseStyle} ${currentPieceStyle}`;
  };

  // Get piece background color as inline style
  const getCellBackgroundColor = (cell: number) => {
    if (cell === 0) {
      return {};
    }
    
    const pieceId = Math.abs(cell);
    const piece = TETRIS_PIECES.find(p => p.id === pieceId);
    
    if (!piece) {
      return {
        backgroundColor: '#991b1b',
        borderColor: '#991b1b'
      };
    }
    
    // Map piece colors to actual hex values
    const colorMap: { [key: string]: string } = {
      'red': '#dc2626',
      'yellow': '#eab308', 
      'purple': '#9333ea',
      'green': '#16a34a',
      'blue': '#2563eb',
      'orange': '#ea580c',
      'cyan': '#0891b2'
    };
    
    const color = colorMap[piece.color] || '#991b1b';
    return {
      backgroundColor: color,
      borderColor: color
    };
  };

  const displayBoard = renderBoard();

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.4)] h-full w-full">
      {/* Game Board - Full Widget */}
      <div 
        className="h-full w-full grid gap-1.5 p-3"
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
              style={getCellBackgroundColor(cell)}
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
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition-colors font-semibold"
              >
                Play
              </button>
            </div>
          )}
          
          {gameState === 'over' && (
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 space-y-3">
              <div className="text-lg font-bold text-gray-300">Game Over!</div>
              <div className="text-sm text-zinc-300">Score: {score}</div>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition-colors font-semibold"
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
