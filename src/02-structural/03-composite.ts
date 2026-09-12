/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 * * Ejercicio:
 * En este ejercicio se modela un sistema de archivos donde File y Folder
 * implementan la misma interfaz FileSystemComponent. Una Folder puede
 * contener tanto archivos como otras carpetas, y showDetails se llama
 * recursivamente para imprimir todo el árbol con su indentación.
 *
 * Se espera entender cómo el patrón Composite permite tratar a un objeto
 * individual (File) y a una composición de objetos (Folder) de la misma
 * forma, ya que el código cliente solo conoce la interfaz común y no le
 * importa si está mostrando un único archivo o una jerarquía completa.
 */

interface FileSystemComponent {
  showDetails(indent?: string): void;
}

class File implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(indent?: string): void {
    console.log(`${indent}- Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent {
  private name: string;
  private contents: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(component: FileSystemComponent) {
    this.contents.push(component);
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}+ Carpeta: ${this.name}`);
    this.contents.forEach((component) => component.showDetails(indent + ' '));
  }
}

// Código cliente
function main() {
  const file1 = new File('archivo1.txt');
  const file2 = new File('archivo2.txt');
  const file3 = new File('archivo3.txt');
  const file4 = new File('archivo4.txt');

  const folder1 = new Folder('Carpeta 1');
  const folder5 = new Folder('Carpeta 5');

  folder1.add(file1);
  folder1.add(file2);

  const folder2 = new Folder('Carpeta 2');
  folder2.add(file3);

  const folder3 = new Folder('Carpeta 3');
  folder3.add(file4);
  folder2.add(folder3);
  folder2.add(folder5);

  const rootFolder = new Folder('Carpeta ROOT');

  rootFolder.add(folder1);
  rootFolder.add(folder2);

  rootFolder.showDetails();
}

main();
