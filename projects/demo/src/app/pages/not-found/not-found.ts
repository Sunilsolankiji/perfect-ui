import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a routerLink="/" class="btn btn-primary">
          ← Back to Home
        </a>
      </div>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      text-align: center;
      color: white;
    }

    .content {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 60px 80px;
    }

    h1 {
      font-size: 8rem;
      margin: 0;
      line-height: 1;
      background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    h2 {
      font-size: 1.8rem;
      margin: 10px 0 20px;
      opacity: 0.95;
    }

    p {
      font-size: 1.1rem;
      opacity: 0.8;
      margin-bottom: 30px;
    }

    .btn-primary {
      display: inline-block;
      padding: 14px 32px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      transition: all 0.2s ease;
    }

    .btn-primary:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      .content {
        padding: 40px 30px;
        margin: 20px;
      }

      h1 {
        font-size: 5rem;
      }

      h2 {
        font-size: 1.4rem;
      }
    }
  `]
})
export class NotFoundComponent {}

