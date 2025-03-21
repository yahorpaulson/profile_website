export default class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: {
        x: number;
        y: number;
    };


    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 1.5 + 1;
        this.color = 'lime';
        this.velocity = { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
    }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;



        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;
    }
    update(canvasWidth: number, canvasHeight: number): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0 || this.x > canvasWidth) this.velocity.x *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.velocity.y *= -1;
    }

}