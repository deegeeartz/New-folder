# Quick Start Script for Quonote Digital

Write-Host "`n🚀 Quonote Digital - Quick Start`n" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "📝 Creating .env template..." -ForegroundColor Yellow
    @"
GEMINI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:5173
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ .env created. Please edit it and add your GEMINI_API_KEY`n" -ForegroundColor Green
    exit
}

# Check if GEMINI_API_KEY is set
$envContent = Get-Content ".env" -Raw
if ($envContent -match "your_api_key_here" -or $envContent -notmatch "GEMINI_API_KEY=\w+") {
    Write-Host "⚠️  Please set your GEMINI_API_KEY in .env file`n" -ForegroundColor Yellow
    exit
}

Write-Host "✅ Environment configured`n" -ForegroundColor Green

# Ask user which mode
Write-Host "Choose startup mode:" -ForegroundColor Yellow
Write-Host "1. Development (Vite + Node.js)"
Write-Host "2. Docker (Production mode)"
Write-Host "3. Docker Build Only (test build)"
$choice = Read-Host "`nEnter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`n🔧 Starting Development Mode..." -ForegroundColor Cyan
        Write-Host "Opening 2 terminals..." -ForegroundColor Yellow
        
        # Start backend
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🔌 Backend Server' -ForegroundColor Green; npm run dev:server"
        
        Start-Sleep -Seconds 2
        
        # Start frontend
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '⚡ Frontend Dev Server' -ForegroundColor Blue; npm run dev"
        
        Write-Host "`n✅ Started! Visit http://localhost:5173" -ForegroundColor Green
    }
    "2" {
        Write-Host "`n🐳 Starting Docker..." -ForegroundColor Cyan
        docker-compose up --build
    }
    "3" {
        Write-Host "`n🔨 Building Docker Image..." -ForegroundColor Cyan
        docker build -t quonote-digital .
        Write-Host "`n✅ Build complete! Run: docker run -p 3001:3001 --env-file .env quonote-digital" -ForegroundColor Green
    }
    default {
        Write-Host "`n❌ Invalid choice" -ForegroundColor Red
    }
}
