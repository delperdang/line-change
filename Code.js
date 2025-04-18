/**
 * Serves the HTML for the web app.
 */
function doGet(e) {
  // Fetch player names from Script Properties
  var playerNamesString = PropertiesService.getScriptProperties().getProperty('playerNames');

  // Provide default if property is not set
  if (!playerNamesString) {
    playerNamesString = "Player1,Player2,Player3"; // Default players
  }

  // Split the string into an array, trim whitespace, and filter empty strings
  var playerNamesArray = playerNamesString.split(',')
                                        .map(name => name.trim())
                                        .filter(name => name.length > 0);

  // Create an HTML template from Index.html
  var template = HtmlService.createTemplateFromFile('Index');

  // Pass the player names array to the template (as a JSON string)
  template.playerNames = JSON.stringify(playerNamesArray);

  // Evaluate the template and serve the HTML
  return template.evaluate()
      .setTitle('Line Change Timer')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1') // For mobile responsiveness
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT); 
}

/**
 * Includes the content of other HTML files (CSS, JS) into the main template.
 * Allows separating CSS and JS from the main HTML file.
 * Usage in Index.html: <?!= include('Stylesheet'); ?> or <?!= include('JavaScript'); ?>
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
