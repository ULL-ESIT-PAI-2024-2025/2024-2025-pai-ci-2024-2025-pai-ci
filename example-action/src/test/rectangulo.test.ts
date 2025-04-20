import { Rectangulo } from '../rectangulo/rectangulo';

describe('Rectangulo', () => {
  let rectangulo: Rectangulo;

  beforeEach(() => {
    rectangulo = new Rectangulo(10, 20, 0, 0, 'red');
  });

  test('should calculate the area correctly', () => {
    expect(rectangulo.getArea()).toBe(0);
  });

  test('should draw the rectangle on the canvas', () => {
    const ctx = {
      fillStyle: '',
      fillRect: jest.fn()
    } as unknown as CanvasRenderingContext2D;

    rectangulo.pintar(ctx);

    expect(ctx.fillStyle).toBe('red');
    expect(ctx.fillRect).toHaveBeenCalledWith(10, 20, 0, 0);
  });
});