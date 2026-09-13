/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Ejercicio:
 * En este ejercicio las acciones de un editor de texto (copiar, pegar,
 * deshacer) se encapsulan como comandos (CopyCommand, PasteCommand,
 * UndoCommand) que implementan la interfaz Command y saben cómo invocar al
 * receptor real (TextEditor). Una Toolbar asocia botones a comandos sin
 * conocer los detalles de cada acción.
 *
 * Se espera entender cómo el patrón Command desacopla quién dispara la
 * acción (la Toolbar) de quién sabe ejecutarla (el TextEditor), permitiendo
 * intercambiar, encolar o incluso deshacer comandos sin tocar el código que
 * los invoca.
 */

import { COLORS } from '../helpers/colors.ts';

// Interfaz Command
interface Command {
  execute(): void;
}

// Clase receptor TextEditor
class TextEditor {
  private text: string = '';
  private clipboard: string = '';
  private history: string[] = [];

  // Agregar texto al editor
  type(text: string): void {
    this.history.push(this.text);
    this.text += text;
  }

  // Copiar el texto actual
  copy(): void {
    this.clipboard = this.text;
    console.log(
      `Texto copiado al portapapeles: \n%c"${this.clipboard}"`,
      COLORS.blue
    );
  }

  // Pegar el texto del portapapeles
  paste(): void {
    this.history.push(this.text);
    this.text += this.clipboard;
    console.log(`Texto después de pegar: \n%c"${this.text}"`, COLORS.blue);
  }

  // Deshacer la última acción
  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!;
      console.log(`Texto después de deshacer: \n%c"${this.text}"`, COLORS.blue);
      return;
    }

    console.log('No hay nada para deshacer.');
  }

  // Mostrar el texto actual
  getText(): string {
    return this.text;
  }
}

//  Clases de comandos concretos
class CopyCommand implements Command {
  private editor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.editor = textEditor;
  }

  execute(): void {
    this.editor.copy();
  }
}

class PasteCommand implements Command {
  private editor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.editor = textEditor;
  }

  execute(): void {
    this.editor.paste();
  }
}

class UndoCommand implements Command {
  private editor: TextEditor;

  constructor(textEditor: TextEditor) {
    this.editor = textEditor;
  }

  execute(): void {
    this.editor.undo();
  }
}

// Clase cliente Toolbar
class Toolbar {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    this.commands[button] = command;
  }

  clickButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.error(`No hay un comando asignado al botón "${button}"`);
  }
}

// Código cliente
function main() {
  const editor = new TextEditor();
  const toolbar = new Toolbar();

  // Crear comandos para el editor
  const copyCommand = new CopyCommand(editor);
  const pasteCommand = new PasteCommand(editor);
  const undoCommand = new UndoCommand(editor);

  // Asignar comandos a los botones de la barra de herramientas
  toolbar.setCommand('copy', copyCommand);
  toolbar.setCommand('paste', pasteCommand);
  toolbar.setCommand('undo', undoCommand);

  // Simulación de edición de texto
  editor.type('H');
  editor.type('o');
  editor.type('l');
  editor.type('a');
  editor.type(' ');
  editor.type('M');
  editor.type('u');
  editor.type('n');
  editor.type('d');
  editor.type('o');
  console.log(`Texto actual: %c"${editor.getText()}"`, COLORS.green);

  // Usar la barra de herramientas
  console.log('\nCopiando texto:');
  toolbar.clickButton('copy');

  console.log('\nPegando texto:');
  toolbar.clickButton('paste');

  console.log('\nDeshaciendo la última acción:');
  toolbar.clickButton('undo');

  console.log('\nDeshaciendo de nuevo:');
  toolbar.clickButton('undo');

  console.log(`\nTexto final: "${editor.getText()}"`);
}

main();
