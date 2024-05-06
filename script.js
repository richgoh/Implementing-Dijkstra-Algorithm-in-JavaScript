
/*Title: Implementing Dijkstra's Algorithm in JavaScript

The objective of this task is to implement Dijkstra's algorithm in JavaScript 
to find the shortest path in a weighted graph. By completing this task, 
you will gain practical experience in implementing a fundamental graph algorithm and 
understanding its application in solving real-world problems.

NB: You have to make some research to get a deeper idea if needed to solve the task */


// RESOLUTION 

/* Pour implémenter l'algorithme de Dijkstra en JavaScript, nous devons suivre ces étapes :
1.	Initialiser les distances du nœud de départ à tous les autres nœuds comme étant l'infini, sauf pour le nœud de départ lui-même, qui est à 0.
2.	Créer une file de priorité pour stocker les nœuds avec leurs distances à partir du nœud de départ.
3.	Initialiser la file de priorité avec le nœud de départ et sa distance (0).
4.	Tant que la file de priorité n'est pas vide :
•	Défiler un nœud avec la plus petite distance de la file de priorité.
•	Pour chaque voisin du nœud défilé :
•	Si la distance totale pour atteindre le voisin via le nœud défilé est inférieure à la distance actuellement enregistrée pour le voisin, mettre à jour la distance.
•	Enfiler le voisin avec sa distance mise à jour dans la file de priorité.
5.	Retourner les distances vers tous les nœuds.
*/

function dijkstra(graph, start) {
    // Initialise les distances avec Infinity pour tous les sommets sauf le sommet de départ
    const distances = {};
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    //  File de priorité pour stocker les sommets avec leurs distances
    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        const { element: currentNode, priority: currentDistance } = priorityQueue.dequeue();

        //Parcours des voisins du noeud courant
        for (let neighbor in graph[currentNode]) {
            // Calcul de la distance totale pour atteindre le voisin via le noeud courant
            const totalDistance = currentDistance + graph[currentNode][neighbor];
            
            // Si la distance totale est inférieure à la distance actuellement enregistrée pour le voisin, mettre à jour la distance
            if (totalDistance < distances[neighbor]) {
                distances[neighbor] = totalDistance;
                //  Ajouter le voisin avec sa distance mise à jour dans la file de priorité
                priorityQueue.enqueue(neighbor, totalDistance);
            }
        }
    }

    return distances;
}

// Implémentation de la File de priorité
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift();
        }
        return null;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Example graph
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

// Example usage
console.log(dijkstra(graph, 'A'));
