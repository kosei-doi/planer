const progressItems = document.querySelectorAll( '.progress-item' );
const root = document.querySelector( '.container' );

const observeAction = ( entries ) => {
  entries.forEach( entry => {
    if ( !entry.isIntersecting || entry.target.classList.contains( 'is-visible' ) ) {
      return;
    }

    const percent = parseFloat( entry.target.dataset.percent );

    if ( !Number.isFinite( percent ) ) {
      return false;
    }

    const duration = parseInt( entry.target.dataset.duration ) || 1500;
    const eleProgressBar = entry.target.querySelector( '.progress-bar' );
    const eleProgressValue = entry.target.querySelector( '.progress-value' );
    const radius = eleProgressBar.getAttribute( 'r' );
    const circumference = 2 * Math.PI * radius;
    const strokeDashOffset = Math.round( circumference - ( circumference * percent ) / 100 );

    // Progress start position
    const startPosition = {
    'right': '0deg',
    'bottom': '90deg',
    'left': '180deg',
    'default': '-90deg'
  }[ entry.target.dataset.startPosition ] || '-90deg';

    // Countup percentage
    const deciamlPointLength = ( String( percent ).split('.')[1] || '' ).length;
    const startTime = performance.now();
    let countValue = 0;

    const countUp = timestamp => {
      const elapsed = timestamp - startTime;
      countValue = ( elapsed / duration ) * percent;
      eleProgressValue.innerText = countValue.toFixed( deciamlPointLength );

      if ( elapsed < duration ) {
        requestAnimationFrame( countUp );
      } else {
        eleProgressValue.innerText = percent;
      }
    }

    // Styles for progress bar animation
    entry.target.style.cssText = `
      --duration: ${ duration }ms;
      --start-rotate: ${ startPosition };
      --stroke-dashoffset: ${ strokeDashOffset };
      --stroke-color: ${ entry.target.dataset.strokeColor };
      --stroke-width: ${ entry.target.dataset.strokeWidth };
    `;

    requestAnimationFrame( countUp );

    entry.target.classList.add( 'is-visible' ); 
  } );
}

const options = {
  root: root,
  rootMargin:"0px 0px -40% 0px"
}

const obsever = new IntersectionObserver( observeAction, options );

progressItems.forEach( target => {
  obsever.observe( target );
} );