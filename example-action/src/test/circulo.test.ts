import { Circulo } from '../circulo/circulo';

describe('Circulo', () => {
  let circulo: Circulo;

  beforeEach(() => {
    circulo = new Circulo(10, 50, 50, 'red');
  });

  test('should create an instance of Circulo', () => {
    expect(circulo).toBeInstanceOf(Circulo);
  });

  test('should calculate the area of the circle correctly', () => {
    const area = circulo.getArea();
    expect(area).toBeCloseTo(7853.981633974483);
  });

  test('should draw the circle on the canvas', () => {
    const ctx = {
      fillStyle: '',
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    circulo.pintar(ctx);

    expect(ctx.fillStyle).toBe('red');
  });
});