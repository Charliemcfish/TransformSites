
var slider_val = document.getElementById('sliderVal');
var mfjlabs_title = document.getElementById('mfjlabs-title');
var mfjlabs_hourly_price = document.getElementById(
  'mfjlabs-hourly-price'
);
var dollar_sign_retainer = document.getElementById(
  'dollar-sign-retainer'
);
var mfjlabs_retainer_price = document.getElementById(
  'mfjlabs-retainer-price'
);
var mfjlabs_retainer_hours = document.getElementById(
  'mfjlabs-retainer-hours'
);
var hourly_dollars = document.getElementById('hourly-dollars');
var hourly_call = document.getElementById('hourly-call');
// Initialize pricing - Growth Package as default
mfjlabs_title.innerHTML = '<br>Growth Package';
hourly_dollars.style.display = 'initial';
hourly_call.style.display = 'none';
mfjlabs_hourly_price.innerHTML = '149';
dollar_sign_retainer.style.display = 'initial';
mfjlabs_retainer_price.innerHTML =
'<b>Perfect for growing businesses:</b> Beautiful brochure website plus eCommerce functionality using WordPress/WooCommerce. <br><br> <b>Get found on Google:</b> Advanced SEO optimisation to outrank your competitors and drive qualified traffic. <br><br> <b>3 Hours Monthly Support:</b> Website updates, content changes, and technical support. <br><br> <b>Delivered in 1-2 weeks:</b> Fast turnaround to get you online quickly. <br><br> <b>All-inclusive:</b> Hosting, security, and ongoing maintenance included.<br>';

mfjlabs_retainer_hours.innerHTML = 'Scale Your Business & Boost Sales';

slider_val.oninput = function () {
  switch (this.value) {
    case '0':
      mfjlabs_title.innerHTML = '&nbsp;<br>Starter Package';
      hourly_dollars.style.display = 'initial';
      hourly_call.style.display = 'none';
      mfjlabs_hourly_price.innerHTML = '99';
      dollar_sign_retainer.style.display = 'none';
      mfjlabs_retainer_price.innerHTML =
        '<b>Perfect starter solution:</b> Professional brochure website to establish your online presence. <br><br> <b>Mobile-friendly design:</b> Looks stunning on all devices - desktop, tablet, and mobile. <br><br> <b>Basic SEO included:</b> Get found on Google with essential search engine optimisation. <br><br> <b>1 Hour Monthly Support:</b> Website updates and technical assistance when you need it. <br><br> <b>Delivered in 1-2 weeks:</b> Fast turnaround to launch your business online quickly.<br>';
      mfjlabs_retainer_hours.innerHTML =
        'Affordable Plan to Build Your Online Presence';
      break;
    case '1':
      mfjlabs_title.innerHTML = '<br>Growth Package';
      hourly_dollars.style.display = 'initial';
      hourly_call.style.display = 'none';
      mfjlabs_hourly_price.innerHTML = '149';
      dollar_sign_retainer.style.display = 'initial';
      mfjlabs_retainer_price.innerHTML =
        '<b>Perfect for growing businesses:</b> Beautiful brochure website plus eCommerce functionality using WordPress/WooCommerce. <br><br> <b>Get found on Google:</b> Advanced SEO optimisation to outrank your competitors and drive qualified traffic. <br><br> <b>3 Hours Monthly Support:</b> Website updates, content changes, and technical support. <br><br> <b>Delivered in 1-2 weeks:</b> Fast turnaround to get you online quickly. <br><br> <b>All-inclusive:</b> Hosting, security, and ongoing maintenance included.<br>';
      mfjlabs_retainer_hours.innerHTML = 'Scale Your Business & Boost Sales';
      break;
    case '2':
      mfjlabs_title.innerHTML = '<br>Pro Package';
      hourly_dollars.style.display = 'initial';
      hourly_call.style.display = 'none';
      mfjlabs_hourly_price.innerHTML = '199';
      dollar_sign_retainer.style.display = 'initial';
      mfjlabs_retainer_price.innerHTML =
        '<b>Complete solution for ambitious businesses:</b> Full-featured website with booking systems, calendar integration, and eCommerce capabilities. <br><br> <b>Dominate search results:</b> Advanced SEO strategy with 10 hours monthly support to keep you at the top of Google. <br><br> <b>10 Hours Monthly Support:</b> Priority support for all your website needs, updates, and enhancements. <br><br> <b>Maximum flexibility:</b> Any features you need - booking systems, payment processing, custom functionality. <br><br> <b>Delivered in 1-2 weeks:</b> Professional service with fast turnaround.<br>';

      mfjlabs_retainer_hours.innerHTML = 'Transform Your Business & Lead Your Market';
      break;
    case '3':
      mfjlabs_title.innerHTML =
        '<br>Custom Enterprise Solution';
      hourly_dollars.style.display = 'none';
      hourly_call.style.display = 'initial';
      mfjlabs_retainer_price.innerHTML =
        '<b>Bespoke solutions:</b> Custom web applications, high-volume eCommerce stores, or complex website builds tailored to your exact requirements. <br><br> <b>Unlimited possibilities:</b> We\'ll build exactly what your business needs. <br><br> <b>Dedicated support:</b> White-glove service from start to finish. <br><br> <b>Contact us:</b> Let\'s discuss your project and create a custom quote.<br>';
      break;
    default:
      // ERROR CONDITION = NO PRICING SHOWN
      mfjlabs_title.innerHTML = 'No Pricing';
      hourly_dollars.style.display = 'none';
      hourly_call.style.display = 'none';
  }
};
