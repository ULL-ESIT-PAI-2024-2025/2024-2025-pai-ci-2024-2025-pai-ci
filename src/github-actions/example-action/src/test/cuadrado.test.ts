import { Cuadrado } from '../cuadrado/cuadrado';

describe('Cuadrado', () => {
  let cuadrado: Cuadrado;

  beforeEach(() => {
    cuadrado = new Cuadrado(4, 10, 10, 'red');
  });

  test('should create an instance of Cuadrado', () => {
    expect(cuadrado).toBeInstanceOf(Cuadrado);
  });

  test('should calculate the area of the square correctly', () => {
    expect(cuadrado.getArea()).toBe(100);
  });

  test('should draw the square on the canvas', () => {
    const ctx = {
      fillStyle: '',
      fillRect: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    cuadrado.pintar(ctx);

    expect(ctx.fillStyle).toBe('red');
  });
});