// Course data array with proper structure for filtering and display
const courses = [
    {
        subject: 'CSE',
        number: 110,
        code: 'CSE 110',
        title: 'Introduction to Programming',
        credits: 2,
        category: 'CSE',
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true  // Mark as completed if you've finished this course
    },
    {
        subject: 'WDD',
        number: 130,
        code: 'WDD 130',
        title: 'Web Fundamentals',
        credits: 2,
        category: 'WDD',
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true  // Mark as completed if you've finished this course
    },
    {
        subject: 'CSE',
        number: 111,
        code: 'CSE 111',
        title: 'Programming with Functions',
        credits: 2,
        category: 'CSE',
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: false  // Change to true if completed
    },
    {
        subject: 'CSE',
        number: 210,
        code: 'CSE 210',
        title: 'Programming with Classes',
        credits: 2,
        category: 'CSE',
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false  // Change to true if completed
    },
    {
        subject: 'WDD',
        number: 131,
        code: 'WDD 131',
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        category: 'WDD',
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false  // Change to true if completed
    },
    {
        subject: 'WDD',
        number: 231,
        code: 'WDD 231',
        title: 'Frontend Web Development I',
        credits: 2,
        category: 'WDD',
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false  // Change to true if completed
    }
];

let currentFilter = 'all';

// Function to display courses based on filter
function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    if (!container) return;

    // Filter courses based on selection
    let filteredCourses = courses;
    if (filter === 'CSE') {
        filteredCourses = courses.filter(course => course.category === 'CSE');
    } else if (filter === 'WDD') {
        filteredCourses = courses.filter(course => course.category === 'WDD');
    }

    // Clear container
    container.innerHTML = '';

    // Check if no courses match the filter
    if (filteredCourses.length === 0) {
        container.innerHTML = '<div class="no-courses">No courses found in this category.</div>';
        const totalCreditsSpan = document.getElementById('totalCredits');
        if (totalCreditsSpan) {
            totalCreditsSpan.textContent = '0';
        }
        return;
    }

    // Create and append course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        // Create card content with course details
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p class="course-title">${course.title}</p>
            <p class="course-description">${course.description.substring(0, 100)}${course.description.length > 100 ? '...' : ''}</p>
            <div class="course-tech">
                ${course.technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="credits">${course.credits} ${course.credits === 1 ? 'credit' : 'credits'}</div>
        `;
        container.appendChild(card);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    
    // Update total credits display
    const totalCreditsSpan = document.getElementById('totalCredits');
    if (totalCreditsSpan) {
        totalCreditsSpan.textContent = totalCredits;
    }
}

// Setup filter button event listeners
function setupFilters() {
    const allBtn = document.getElementById('filterAll');
    const cseBtn = document.getElementById('filterCSE');
    const wddBtn = document.getElementById('filterWDD');

    if (allBtn) {
        allBtn.addEventListener('click', () => {
            currentFilter = 'all';
            updateActiveButton(allBtn);
            displayCourses('all');
        });
    }

    if (cseBtn) {
        cseBtn.addEventListener('click', () => {
            currentFilter = 'CSE';
            updateActiveButton(cseBtn);
            displayCourses('CSE');
        });
    }

    if (wddBtn) {
        wddBtn.addEventListener('click', () => {
            currentFilter = 'WDD';
            updateActiveButton(wddBtn);
            displayCourses('WDD');
        });
    }
}

// Update active button styling
function updateActiveButton(activeBtn) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active-filter');
    });
    activeBtn.classList.add('active-filter');
}

// Initialize the courses display when page loads
if (document.getElementById('coursesContainer')) {
    displayCourses('all');
    setupFilters();
}