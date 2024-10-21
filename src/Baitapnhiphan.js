// function FindId(arr, Idselect) {
//     let left = 0;
//     let right = arr.length - 1;
  
//     while (left <= right) {
//       const mid = Math.floor((left + right) / 2);
  
//       if (arr[mid] === Idselect) {
//         return mid; 
//       }
  
//       if (arr[mid] < Idselect) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
  
//     return -1; 
//   }
  

//   const NumberId = [1001, 1005, 1010, 1012, 1020];
//   const Idselect = 1012;
  
//   const result = FindId(NumberId, Idselect);
  
//   if (result !== -1) {
//     console.log(`ID ${Idselect}ở vị trí ${result}`);
//   } else {
//     console.log(`ID  ${Idselect} ko có`);
//   }
  

function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log(currentNode); 

      for (const neighbor of graph[currentNode]) {
          if (!visited.has(neighbor)) {
              visited.add(neighbor);
              queue.push(neighbor);
              console.log(neighbor);
          }
      }
  }
}

// Ví dụ sử dụng
const graph = {
  1: [2, 3, 4],
  2: [5, 6],
  3: [],
  4: [],
  5: [],
  6: []
};

bfs(graph, 1);