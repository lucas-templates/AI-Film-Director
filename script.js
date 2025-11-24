// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Script Analysis Function
function analyzeScript() {
    const scriptInput = document.getElementById('script-input').value.trim();
    const resultsContainer = document.getElementById('analysis-results');
    
    if (!scriptInput) {
        resultsContainer.innerHTML = `
            <div class="analysis-result-item">
                <h4>⚠️ No Script Provided</h4>
                <p>Please enter a script to analyze.</p>
            </div>
        `;
        return;
    }
    
    // Simulate AI analysis
    resultsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-3">Analyzing script...</p></div>';
    
    setTimeout(() => {
        const analysis = performScriptAnalysis(scriptInput);
        displayAnalysisResults(analysis);
    }, 1500);
}

// Perform script analysis
function performScriptAnalysis(script) {
    const wordCount = script.split(/\s+/).length;
    const charCount = script.length;
    const lines = script.split('\n').length;
    const dialogueMatches = script.match(/([A-Z][A-Z\s]+)\n/g) || [];
    const characterCount = new Set(dialogueMatches.map(m => m.trim())).size;
    
    // Analyze structure
    const hasFadeIn = script.toLowerCase().includes('fade in');
    const hasFadeOut = script.toLowerCase().includes('fade out');
    const sceneCount = (script.match(/^(INT\.|EXT\.)/gim) || []).length;
    
    // Analyze dialogue
    const dialogueLines = script.match(/^[A-Z][A-Z\s]+\n/gm) || [];
    const avgDialogueLength = dialogueLines.length > 0 
        ? dialogueLines.reduce((sum, line) => sum + line.length, 0) / dialogueLines.length 
        : 0;
    
    // Generate insights
    const insights = [];
    
    if (wordCount < 500) {
        insights.push('Short script - consider expanding scenes or adding more detail.');
    } else if (wordCount > 5000) {
        insights.push('Long script - consider tightening pacing or removing unnecessary scenes.');
    } else {
        insights.push('Good script length for a short film or scene.');
    }
    
    if (characterCount < 2) {
        insights.push('Limited character interaction - consider adding more characters or dialogue.');
    } else if (characterCount > 5) {
        insights.push('Many characters - ensure each has a clear purpose and distinct voice.');
    } else {
        insights.push('Good character balance for engaging storytelling.');
    }
    
    if (!hasFadeIn || !hasFadeOut) {
        insights.push('Consider adding proper scene transitions (FADE IN/FADE OUT).');
    }
    
    if (sceneCount === 0) {
        insights.push('No scene headers detected - add INT./EXT. scene descriptions.');
    } else {
        insights.push(`Well-structured with ${sceneCount} scene(s).`);
    }
    
    if (avgDialogueLength > 100) {
        insights.push('Some dialogue lines are quite long - consider breaking them up for better pacing.');
    } else if (avgDialogueLength < 20) {
        insights.push('Dialogue is concise - good for fast-paced scenes.');
    }
    
    // Calculate overall score
    let score = 75;
    if (hasFadeIn && hasFadeOut) score += 5;
    if (sceneCount > 0) score += 5;
    if (characterCount >= 2 && characterCount <= 5) score += 5;
    if (wordCount >= 500 && wordCount <= 5000) score += 5;
    if (avgDialogueLength >= 20 && avgDialogueLength <= 100) score += 5;
    
    return {
        wordCount,
        charCount,
        lines,
        characterCount,
        sceneCount,
        dialogueCount: dialogueLines.length,
        avgDialogueLength: Math.round(avgDialogueLength),
        insights,
        score: Math.min(100, score)
    };
}

// Display analysis results
function displayAnalysisResults(analysis) {
    const resultsContainer = document.getElementById('analysis-results');
    
    const scoreColor = analysis.score >= 80 ? '#1976D2' : analysis.score >= 60 ? '#FFD700' : '#7B1FA2';
    
    resultsContainer.innerHTML = `
        <div class="analysis-result-item" style="border-left-color: ${scoreColor};">
            <h4>📊 Overall Score: ${analysis.score}/100</h4>
            <p>Your script shows ${analysis.score >= 80 ? 'excellent' : analysis.score >= 60 ? 'good' : 'potential for improvement'} structure and formatting.</p>
        </div>
        
        <div class="analysis-result-item">
            <h4>📝 Statistics</h4>
            <p><strong>Word Count:</strong> ${analysis.wordCount.toLocaleString()}</p>
            <p><strong>Character Count:</strong> ${analysis.charCount.toLocaleString()}</p>
            <p><strong>Total Lines:</strong> ${analysis.lines}</p>
            <p><strong>Scenes:</strong> ${analysis.sceneCount}</p>
            <p><strong>Characters:</strong> ${analysis.characterCount}</p>
            <p><strong>Dialogue Lines:</strong> ${analysis.dialogueCount}</p>
            <p><strong>Avg. Dialogue Length:</strong> ${analysis.avgDialogueLength} characters</p>
        </div>
        
        <div class="analysis-result-item">
            <h4>💡 AI Insights</h4>
            ${analysis.insights.map(insight => `<p>• ${insight}</p>`).join('')}
        </div>
        
        <div class="analysis-result-item">
            <h4>🎬 Recommendations</h4>
            <p>• Review character development and ensure each character has a clear arc</p>
            <p>• Check pacing - ensure scenes flow naturally</p>
            <p>• Verify dialogue sounds natural when read aloud</p>
            <p>• Consider visual storytelling elements</p>
        </div>
    `;
    
    // Animate results
    resultsContainer.style.animation = 'fadeInUp 0.8s ease-out';
}

// Virtual Casting Function
function findCasting() {
    const charName = document.getElementById('char-name').value.trim();
    const charAge = document.getElementById('char-age').value.trim();
    const charTraits = document.getElementById('char-traits').value.trim();
    
    const resultsContainer = document.getElementById('casting-results');
    
    if (!charName || !charAge || !charTraits) {
        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <div class="placeholder-icon">⚠️</div>
                <p>Please fill in all character details to find matches.</p>
            </div>
        `;
        return;
    }
    
    // Simulate AI casting search
    resultsContainer.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-3">Searching talent database...</p></div>';
    
    setTimeout(() => {
        const matches = generateCastingMatches(charName, charAge, charTraits);
        displayCastingResults(matches);
    }, 1500);
}

// Generate casting matches (simulated AI)
function generateCastingMatches(name, age, traits) {
    const talentPool = [
        { name: 'Sarah Chen', age: 28, traits: 'Ambitious, creative, introspective', experience: '5 years', matchScore: 95 },
        { name: 'Marcus Johnson', age: 26, traits: 'Creative, passionate, determined', experience: '3 years', matchScore: 88 },
        { name: 'Emma Rodriguez', age: 29, traits: 'Ambitious, thoughtful, expressive', experience: '7 years', matchScore: 92 },
        { name: 'David Kim', age: 27, traits: 'Introspective, creative, focused', experience: '4 years', matchScore: 85 },
        { name: 'Olivia Martinez', age: 25, traits: 'Ambitious, creative, intuitive', experience: '2 years', matchScore: 82 },
        { name: 'James Wilson', age: 30, traits: 'Creative, analytical, expressive', experience: '6 years', matchScore: 90 }
    ];
    
    // Simulate AI matching based on traits
    const userTraits = traits.toLowerCase().split(',').map(t => t.trim());
    
    const matches = talentPool.map(talent => {
        const talentTraits = talent.traits.toLowerCase().split(',').map(t => t.trim());
        const commonTraits = userTraits.filter(t => talentTraits.some(tt => tt.includes(t) || t.includes(tt)));
        const matchScore = Math.min(100, talent.matchScore + (commonTraits.length * 3));
        
        return {
            ...talent,
            matchScore: matchScore,
            commonTraits: commonTraits
        };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
    
    return matches;
}

// Display casting results
function displayCastingResults(matches) {
    const resultsContainer = document.getElementById('casting-results');
    
    if (matches.length === 0) {
        resultsContainer.innerHTML = `
            <div class="results-placeholder">
                <div class="placeholder-icon">🔍</div>
                <p>No matches found. Try adjusting character traits.</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = `
        <h3 class="mb-4" style="color: #FFD700;">Top Matches</h3>
        ${matches.map((match, index) => `
            <div class="casting-match">
                <h4>${index + 1}. ${match.name}</h4>
                <p><strong>Age:</strong> ${match.age} years</p>
                <p><strong>Traits:</strong> ${match.traits}</p>
                <p><strong>Experience:</strong> ${match.experience}</p>
                ${match.commonTraits.length > 0 ? `<p><strong>Matching Traits:</strong> ${match.commonTraits.join(', ')}</p>` : ''}
                <div class="match-score">Match Score: ${match.matchScore}%</div>
            </div>
        `).join('')}
    `;
    
    // Animate results
    resultsContainer.style.animation = 'fadeInUp 0.8s ease-out';
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe sections on load
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add smooth scroll to nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

