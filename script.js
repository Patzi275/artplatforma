const instructors = [
    { "name": "Carlos Roy", "role": "Quality assurance manager" },
    { "name": "Thomas Siver", "role": "Founder and executive director" },
    { "name": "Antony Wong", "role": "Head of digital experience" },
    { "name": "Deon Flower", "role": "Cofounder and creative director" },
    { "name": "Josephine Roy", "role": "Quality assurance manager" },
    { "name": "John Doe", "role": "Software Engineer" },
    { "name": "Jane Doe", "role": "Product Manager" },
    { "name": "Sam Smith", "role": "UX Designer" },
    { "name": "Jonas Cenako", "role": "Frontend Developer" },
];
let first_instructor = 0;

const trigger = document.querySelector('.trigger');
const [instr_prev, instr_next] = document.querySelectorAll('.instructor--lvl1');
const main_tl = gsap.timeline();

main_tl
    .add(a1_tl())
    .add(a2_tl(), '<1')
    .add(event_outro(), '0.4')
    .add(workshop_intro(), '<.5');

main_tl.pause();

// instructors_tl()

// workshop_intro()


document.addEventListener('DOMContentLoaded', init);

trigger.addEventListener('click', () => {
    main_tl.restart();
});

instr_next.addEventListener('click', () => {
    const elements = document.querySelectorAll('.instructors__list > *');
    const l = instructors.length;
    first_instructor = (first_instructor + 1) % l;

    elements.forEach((value, index) => {
        const instr = instructors[(first_instructor + index) % l];
        value.querySelector('.instructor__name').textContent = instr.name;
        value.querySelector('.instructor__role').textContent = instr.role;
    });
    instructors_next_tl();
    scroll_profiles_next();
});


function init() {
    const a2__profile = document.querySelector('.a2__profile-container');
    [instructors[instructors.length-1], ...instructors, instructors[0]].forEach((value, index) => {
        const img = document.createElement('img');
        const alt = value.name.split(' ').join('-').toLowerCase();
        img.src = `https://robohash.org/${alt}`;
        img.alt = alt;
        a2__profile.appendChild(img);
    });
    
}

function a1_tl() {
    const tl = gsap.timeline()
    tl
        .to(['.a1__circle1', '.a1__rect2'], {
            x: 200,
            duration: 1.5,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.in'
        })
        .to('.a1__rect3', {
            duration: 1.5,
            scaleY: 0,
            ease: 'power2.inOut',
        }, '<0.2')
        .to('.a1__rect1', {
            x: 140,
            duration: 1.3,
            opacity: 0,
            ease: 'power2.inOut',
        }, '0.2')
        .to(['.a1__circle2', '.a1__circle3'], {
            x: 100,
            duration: 1.5,
            opacity: 0.1,
            stagger: 0.05,
            ease: 'power2.inOut'
        }, '<0.2')
        .to('.a1__man', {
            x: 500,
            duration: 2,
            rotate: '165deg',
            ease: 'power2.inOut'
        }, '0.3')
        .to('.a1__man', {
            duration: .5,
            opacity: 0,
            ease: 'power2.in'
        }, '=-0.4');

    return tl;
}

function a2_tl() {
    const tl = gsap.timeline();
    tl
        .fromTo(['.a2__circle1', '.a2__rect1', '.a2__rect2'], { x: -150 }, {
            opacity: 1,
            duration: 1.5,
            x: (index) => ['-20%', '50%', '30%'][index],
            stagger: 0.1,
            ease: 'power2.inOut'
        })
        .from('.a2__profile', {
            width: 0,
            height: 0,
            duration: 2,
            ease: 'back.out'
        }, '<')
        .fromTo('.a2__profile-container', {
            // should not be -200% if first_instructor is not 0
            x: '-200%',
            gap: '2rem',
        }, {
            x: '-100%',
            gap: '0rem',
            duration: 1,
            ease: 'power3.out'
        }, '<')
        .fromTo('.a2__circle2', { x: -150 }, {
            opacity: 1,
            x: '-40%',
            duration: 1.5,
            ease: 'power2.inOut'
        }, '0.4')
        .from(['.a2__rect3', '.a2__rect4'], {
            height: 0,
            duration: 1,
            ease: 'power2.inOut',
            stagger: 0.1
        }, '0.3');

    return tl;
}

function scroll_profiles_next() {
    const tween = gsap.fromTo('.a2__profile-container', {
        x: `${-100 * (first_instructor)}%`
    }, {
        x: `${-100 * (first_instructor + 1)}%`,
        duration: .75,
        ease: 'power2.inOut'
    });
    return tween;
}


function event_outro() {
    // A1 Left TimeLine
    const tl = gsap.to('.event__container > *', {
        x: -200,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
        display: 'none',
        onComplete: () => {
            document.querySelector('.workshop').style.zIndex = 0;
        }
    });
    return tl;
}

function workshop_intro() {
    const tl = gsap.timeline();
    tl
        .from('.workshop__container > *', {
            scale: .5,
            opacity: 0,
            duration: .75,
            stagger: .2,
            ease: 'circ.out'
        }, 0);
    return tl;
}

function instructors_next_tl() {
    const tl = gsap.timeline({ default: { duration: .5 } });
    const lvl1_list = document.querySelectorAll('.instructor--lvl1');
    const lvl2_list = document.querySelectorAll('.instructor--lvl2');
    const lvl3_list = document.querySelectorAll('.instructor--lvl3');
    const lvl4_list = document.querySelectorAll('.instructor--lvl4');
    console.log(lvl4_list);
    tl
        .fromTo('.instructor--lvl4.top', { opacity: .5, y: 0 }, {
            y: -30,
            opacity: 0,
            ease: 'power2.inOut'
        })
        .from(lvl3_list[0], {
            y: 23,
            fontSize: '0.9rem',
            opacity: 0.7,
            ease: 'power2.inOut'
        }, 0)
        .from(lvl2_list[0], {
            y: 28,
            fontSize: '1.2rem',
            fontWeight: 500,
            opacity: .85,
            ease: 'power2.inOut'
        }, 0)
        .from(lvl1_list[0], {
            y: 42,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            opacity: 1,
            zIndex: 1,
            ease: 'power2.inOut'
        }, 0)
        .from('.instructor--active .instructor__name', {
            y: 58,
            opacity: .85,
            fontWeight: 500,
            fontSize: '1.2rem',
            ease: 'power2.inOut'
        }, 0)
        .from('.instructor--active .instructor__role', {
            y: 30,
            opacity: .7,
            fontSize: '1rem',
            ease: 'power2.out'
        }, '<0.25')
        .from(lvl1_list[1], {
            y: 24,
            opacity: .7,
            fontSize: '0.9rem',
            ease: 'power2.inOut'
        }, '0')
        .from(lvl2_list[1], {
            y: 22,
            opacity: .5,
            fontSize: '0.8rem',
            ease: 'power2.inOut'
        }, '0')
        .from(lvl3_list[1], {
            y: 20,
            opacity: 0,
            fontSize: '0.7rem',
            ease: 'power2.inOut'
        }, '0');

    return tl;
}

function instructors_prev_tl() {
    const tl = gsap.timeline({ default: { duration: .5 } });
    const lvl1_list = document.querySelectorAll('.instructor--lvl1');
    const lvl2_list = document.querySelectorAll('.instructor--lvl2');
    const lvl3_list = document.querySelectorAll('.instructor--lvl3');

    tl
        .fromTo('.instructor--lvl4', { opacity: .5, y: 0 }, {
            y: 30,
            opacity: 0,
            ease: 'power2.inOut'
        })
        .from(lvl3_list[0], {
            y: -23,
            fontSize: '0.9rem',
            opacity: 0.7,
            ease: 'power2.inOut'
        }, 0)
        .from(lvl2_list[0], {
            y: -28,
            fontSize: '1.2rem',
            fontWeight: 500,
            opacity: .85,
            ease: 'power2.inOut'
        }, 0)
        .from(lvl1_list[0], {
            y: -42,
            fontSize: '1.5rem',
            fontWeight: 'bold',
            opacity: 1,
            zIndex: 1,
            ease: 'power2.inOut'
        }, 0)
        .from('.instructor--active .instructor__name', {
            y: -58,
            opacity: .85,
            fontWeight: 500,
            fontSize: '1.2rem',
            ease: 'power2.inOut'
        }, 0)
        .from('.instructor--active .instructor__role', {
            y: -30,
            opacity: .7,
            fontSize: '1rem',
            ease: 'power2.out'
        }, '<0.25')
        .from(lvl1_list[1], {
            y: -24,
            opacity: .7,
            fontSize: '0.9rem',
            ease: 'power2.inOut'
        }, '0')
        .from(lvl2_list[1], {
            y: -22,
            opacity: .5,
            fontSize: '0.8rem',
            ease: 'power2.inOut'
        }, '0')
        .from(lvl3_list[1], {
            y: -20,
            opacity: 0,
            fontSize: '0.7rem',
            ease: 'power2.inOut'
        }, '0');

    return tl;
}