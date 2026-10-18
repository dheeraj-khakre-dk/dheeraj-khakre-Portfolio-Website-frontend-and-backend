import React, { useState } from 'react';

export const AngularShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'component' | 'template' | 'service' | 'state'>('component');

  const codeSnippets = {
    component: `// portfolio-contact.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioService } from '../services/portfolio.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-portfolio-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './portfolio-contact.component.html',
  styleUrls: ['./portfolio-contact.component.scss']
})
export class PortfolioContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private portfolioService = inject(PortfolioService);
  private snackBar = inject(MatSnackBar);

  contactForm!: FormGroup;
  isTransmitting = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isTransmitting = true;
    this.portfolioService.dispatchMessage(this.contactForm.value).subscribe({
      next: (res) => {
        this.isTransmitting = false;
        this.snackBar.open('Message transmitted to Dheeraj Khakre!', 'OK', { duration: 4000 });
        this.contactForm.reset();
      },
      error: (err) => {
        this.isTransmitting = false;
        this.snackBar.open('Transmission error. Direct email available.', 'Close');
      }
    });
  }
}`,

    template: `<!-- portfolio-contact.component.html -->
<section class="contact-gateway">
  <div class="form-card">
    <div class="header">
      <h3>Send a Direct Message</h3>
      <span class="badge" [class.valid]="contactForm.valid">
        Form Status: {{ contactForm.valid ? 'VALID' : 'INVALID' }}
      </span>
    </div>

    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Your Name *</label>
          <input id="name" type="text" formControlName="name" placeholder="Alex Mercer" />
          <span class="error" *ngIf="contactForm.get('name')?.touched && contactForm.get('name')?.hasError('required')">
            Name is required.
          </span>
        </div>

        <div class="form-group">
          <label for="email">Your Email *</label>
          <input id="email" type="email" formControlName="email" placeholder="alex@company.com" />
          <span class="error" *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.hasError('email')">
            Please enter a valid email address.
          </span>
        </div>
      </div>

      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" rows="4" formControlName="message" placeholder="Project challenge details..."></textarea>
      </div>

      <button type="submit" [disabled]="contactForm.invalid || isTransmitting" class="submit-btn">
        <span *ngIf="isTransmitting">Transmitting...</span>
        <span *ngIf="!isTransmitting">Send Message</span>
      </button>
    </form>
  </div>
</section>`,

    service: `// portfolio.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { ProjectItem } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/portfolio';

  private activeProjectsSubject = new BehaviorSubject<ProjectItem[]>([]);
  public activeProjects$ = this.activeProjectsSubject.asObservable();

  /**
   * Fetches real GitHub project metadata and telemetry metrics
   */
  loadFeaturedProjects(): Observable<ProjectItem[]> {
    return this.http.get<ProjectItem[]>(\`\${this.apiUrl}/projects\`).pipe(
      map(projects => {
        this.activeProjectsSubject.next(projects);
        return projects;
      }),
      catchError(err => {
        console.error('Failed to load GitHub projects', err);
        return throwError(() => new Error('Service unavailable'));
      })
    );
  }

  /**
   * Dispatches direct recruiter inquiries to backend mailer
   */
  dispatchMessage(payload: any): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(\`\${this.apiUrl}/contact\`, payload);
  }
}`,

    state: `// state-management-pattern.ts (Signals + RxJS)
import { signal, computed } from '@angular/core';
import { ProjectItem } from '../models/project.model';

export class PortfolioStore {
  // Writable signal for reactive filter state
  readonly selectedCategory = signal<string>('ALL');

  // Writable signal for loaded projects
  readonly projects = signal<ProjectItem[]>([
    { id: '1', title: 'Automated Receipt Processing & OCR', repo: 'Dheeraj-Khakre/Automate-Accounts...' },
    { id: '2', title: 'E-commerce Microservices Auth', repo: 'Dheeraj-Khakre/E-commerce-MicroServices-fork' },
    { id: '3', title: 'Box-Guard Malware Threat Monitor', repo: 'Dheeraj-Khakre/Box-Guard-file-monitor...' },
    { id: '4', title: 'Real-Time Portfolio Tracker', repo: 'Dheeraj-Khakre/Financial-portfolio-tracker-8Byte' }
  ]);

  // Computed signal with automated memoization
  readonly filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'ALL') return this.projects();
    return this.projects().filter(p => p.category === category);
  });
}`
  };

  return (
    <section className="py-14 flex flex-col gap-8" id="angular-architecture">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dd0031]/15 border border-[#dd0031]/30 text-[#ff8099] font-mono text-[11px] font-semibold uppercase tracking-wider w-fit">
            <span className="material-symbols-outlined text-[16px] text-[#dd0031]">widgets</span>
            <span>Angular &amp; Full Stack Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl text-[#d4e4fa] font-bold tracking-tight">
            Clean Frontend Design &amp; Angular Standards
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#c2c6d6] max-w-2xl">
            Demonstrating structured, maintainable frontend architecture with Angular (v14–v19), standalone components, RxJS reactive pipelines, and strict type safety.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11.5px] bg-[#122131] border border-[#1c2b3c] p-1.5 rounded-xl">
          <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#adc6ff] font-medium">
            TypeScript 5+
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#d0bcff] font-medium">
            RxJS 7+
          </span>
          <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-emerald-400 font-medium">
            Signals &amp; Standalone
          </span>
        </div>
      </div>

      {/* Code Studio Box */}
      <div className="rounded-xl bg-[#010f1f] border border-[#1c2b3c] overflow-hidden shadow-2xl flex flex-col font-mono">
        {/* Header Tabs */}
        <div className="bg-[#122131] border-b border-[#1c2b3c] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('component')}
              className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                activeTab === 'component'
                  ? 'bg-[#1c2b3c] text-[#adc6ff] font-bold border border-[#273647]'
                  : 'text-[#8c909f] hover:text-[#d4e4fa]'
              }`}
            >
              component.ts
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                activeTab === 'template'
                  ? 'bg-[#1c2b3c] text-[#adc6ff] font-bold border border-[#273647]'
                  : 'text-[#8c909f] hover:text-[#d4e4fa]'
              }`}
            >
              template.html
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                activeTab === 'service'
                  ? 'bg-[#1c2b3c] text-[#adc6ff] font-bold border border-[#273647]'
                  : 'text-[#8c909f] hover:text-[#d4e4fa]'
              }`}
            >
              service.ts
            </button>
            <button
              onClick={() => setActiveTab('state')}
              className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                activeTab === 'state'
                  ? 'bg-[#1c2b3c] text-[#adc6ff] font-bold border border-[#273647]'
                  : 'text-[#8c909f] hover:text-[#d4e4fa]'
              }`}
            >
              store.ts
            </button>
          </div>

          <div className="text-[11px] text-[#8c909f] hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Maintainable Architecture Governed by Clean Code &amp; SOLID</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 bg-[#051424] overflow-x-auto text-[12.5px] leading-relaxed text-[#c2c6d6] max-h-[420px] overflow-y-auto">
          <pre className="font-mono">
            <code>{codeSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Code Footer Explainer */}
        <div className="bg-[#0d1c2d] border-t border-[#1c2b3c] px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[#8c909f]">
          <span>
            Pattern: Standalone Angular Architecture with Dependency Injection &amp; RxJS Observables
          </span>
          <span className="text-[#adc6ff]">
            100% Type-Safe Contracts between Java Spring Boot REST &amp; Angular Client
          </span>
        </div>
      </div>
    </section>
  );
};
