/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 * * Ejercicio:
 * En este ejercicio se construye un generador de reportes donde una fábrica
 * abstracta (ReportFactory) define el método generateReport, delegando en
 * subclases concretas (SalesReportFactory, InventoryReportFactory) la
 * creación del reporte específico (SalesReport, InventoryReport) según lo
 * que el usuario elija por consola.
 *
 * Se espera entender cómo el patrón Factory Method permite que el código
 * cliente trabaje siempre contra la clase base ReportFactory, sin conocer
 * ni acoplarse a las clases concretas de reporte que finalmente se instancian.
 */

import { COLORS } from '../helpers/colors.ts';

// Definir la interfaz Report
interface Report {
  generate(): void;
}

// Clases concretas de reportes
class SalesReport implements Report {
  generate(): void {
    console.log('%cGenerando reporte de ventas...', COLORS.green);
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log('%cGenerando reporte de inventario...', COLORS.orange);
  }
}

// Clase base ReportFactory con el método Factory
abstract class ReportFactory {
  protected abstract createReport(): Report;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

// Clases concretas de fábricas de reportes
class SalesReportFactory extends ReportFactory {
  createReport(): Report {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Report {
    return new InventoryReport();
  }
}

// Código cliente
function main() {
  let reportFactory: ReportFactory;

  const reportType = prompt('¿Qué tipo de reporte deseas? (sales/inventory)');

  if (reportType === 'sales') {
    reportFactory = new SalesReportFactory();
  } else {
    reportFactory = new InventoryReportFactory();
  }

  reportFactory.generateReport();
}

main();
