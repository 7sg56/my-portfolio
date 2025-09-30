"use client";

import React, { useState, useEffect } from "react";

export default function AlgorithmWindow() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>("");
  const [speed, setSpeed] = useState(100);

  const algorithms = [
    { name: "Bubble Sort", value: "bubble" },
    { name: "Selection Sort", value: "selection" },
    { name: "Insertion Sort", value: "insertion" },
    { name: "Quick Sort", value: "quick" },
    { name: "Merge Sort", value: "merge" }
  ];

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
  };

  // Initialize array on component mount
  useEffect(() => {
    generateArray();
  }, []);

  // Bubble Sort
  const bubbleSort = async (arr: number[]) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, speed / 2));
        }
      }
    }
  };

  // Selection Sort
  const selectionSort = async (arr: number[]) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, speed / 2));
      }
    }
  };

  // Insertion Sort
  const insertionSort = async (arr: number[]) => {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, speed / 2));
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, speed / 2));
    }
  };

  // Quick Sort
  const quickSort = async (arr: number[], low: number = 0, high: number = arr.length - 1) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, speed / 2));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise(resolve => setTimeout(resolve, speed / 2));
    return i + 1;
  };

  // Merge Sort
  const mergeSort = async (arr: number[], left: number = 0, right: number = arr.length - 1) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, speed / 2));
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, speed / 2));
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
      setArray([...arr]);
      await new Promise(resolve => setTimeout(resolve, speed / 2));
    }
  };

  const startSorting = async (algorithm: string) => {
    if (isSorting) return;
    
    setIsSorting(true);
    setCurrentAlgorithm(algorithm);
    
    const arr = [...array];
    
    switch (algorithm) {
      case "bubble":
        await bubbleSort(arr);
        break;
      case "selection":
        await selectionSort(arr);
        break;
      case "insertion":
        await insertionSort(arr);
        break;
      case "quick":
        await quickSort(arr);
        break;
      case "merge":
        await mergeSort(arr);
        break;
    }
    
    setIsSorting(false);
    setCurrentAlgorithm("");
  };

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-theme bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-theme">Algorithm Visualizer</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-theme-2 text-sm">Speed:</label>
            <input
              type="range"
              min="50"
              max="200"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              disabled={isSorting}
            />
            <span className="text-theme-2 text-xs min-w-[3rem]">{speed}ms</span>
          </div>
          <button
            onClick={generateArray}
            disabled={isSorting}
            className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            🎲 New Array
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Algorithm Selection */}
          <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-theme mb-4">Choose Algorithm</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {algorithms.map((algo) => (
                <button
                  key={algo.value}
                  onClick={() => startSorting(algo.value)}
                  disabled={isSorting}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentAlgorithm === algo.value
                      ? "bg-accent text-white shadow-lg scale-105"
                      : isSorting
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700/30 text-theme-2 hover:bg-gray-700/50 hover:text-theme hover:scale-105 active:scale-95"
                  }`}
                >
                  {algo.name}
                </button>
              ))}
            </div>
          </div>

          {/* Visualization */}
          <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-theme mb-4">Visualization</h2>
            <div className="flex items-end justify-center gap-0.5 h-80 bg-gradient-to-t from-gray-900/80 to-gray-800/60 rounded-xl p-6 shadow-inner">
              {array.map((value, index) => (
                <div
                  key={index}
                  className={`transition-all duration-75 ease-out rounded-t-lg shadow-lg hover:shadow-xl`}
                  style={{
                    height: `${(value / 100) * 280}px`,
                    width: `${Math.max(2, 100 / array.length)}%`,
                    minWidth: '2px',
                    background: `linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)`,
                    boxShadow: `0 0 ${Math.max(2, value / 20)}px rgba(248, 250, 252, 0.4)`
                  }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <div className="flex items-center gap-4 text-sm text-theme-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Sorted Elements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span>Unsorted Elements</span>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="glass-2 rounded-lg p-6 border border-theme bg-black/20 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-theme mb-4">Algorithm Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-theme text-base">Time Complexity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Bubble Sort</span>
                    <span className="text-red-400 text-sm font-mono">O(n²)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Selection Sort</span>
                    <span className="text-red-400 text-sm font-mono">O(n²)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Insertion Sort</span>
                    <span className="text-red-400 text-sm font-mono">O(n²)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Quick Sort</span>
                    <span className="text-green-400 text-sm font-mono">O(n log n)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Merge Sort</span>
                    <span className="text-green-400 text-sm font-mono">O(n log n)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-theme text-base">Space Complexity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Bubble Sort</span>
                    <span className="text-green-400 text-sm font-mono">O(1)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Selection Sort</span>
                    <span className="text-green-400 text-sm font-mono">O(1)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Insertion Sort</span>
                    <span className="text-green-400 text-sm font-mono">O(1)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Quick Sort</span>
                    <span className="text-yellow-400 text-sm font-mono">O(log n)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded">
                    <span className="text-theme-2 text-sm">Merge Sort</span>
                    <span className="text-red-400 text-sm font-mono">O(n)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
