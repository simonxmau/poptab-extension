export default defineBackground(() => {
  /**
   * Context menu click event handler
   * @param info Information about the menu item click
   * @param tab The current tab (may be undefined)
   */
  function genericOnClick(
    info: Browser.contextMenus.OnClickData,
    tab?: Browser.tabs.Tab
  ): void {
    console.log('info', info, tab);

    switch (info.menuItemId) {
      case 'page':
        handleOpenCurrentTabInNewWindow(tab);
        break;
      case 'open-incognito':
        handleOpenCurrentTabInIncognito(tab);
        break;
      case 'link':
        console.log('Link item clicked. Status:', info.linkUrl);
        break;
      case 'image':
        console.log('Image item clicked. Status:', info.srcUrl);
        break;
      default:
        console.log('Standard context menu item clicked.');
    }
  }

  /**
   * Move the current tab to a new window
   * @param tab The current tab
   */
  async function handleOpenCurrentTabInNewWindow(tab?: Browser.tabs.Tab) {
    if (!tab || !tab.url) {
      console.error('Failed to get current tab or its URL.');
      return;
    }
    if (!tab.id) {
      console.error('Failed to get current tab ID.');
      return;
    }
    try {
      const createdWindow = await browser.windows.create({
        tabId: tab.id,
        focused: true,
      });
      if (!createdWindow) {
        console.error('Failed to create new window.');
      }
    } catch (error) {
      console.error('Error moving tab to new window:', error);
    }
  }

  /**
   * Open the current tab's URL in an incognito window
   * @param tab The current tab
   */
  async function handleOpenCurrentTabInIncognito(tab?: Browser.tabs.Tab) {
    if (!tab || !tab.url) {
      console.error('Failed to get current tab or its URL.');
      return;
    }
    try {
      const createdWindow = await browser.windows.create({
        url: tab.url,
        incognito: true,
        focused: true,
      });
      if (!createdWindow) {
        console.error('Failed to create incognito window.');
      }
    } catch (error) {
      console.error('Error opening tab in incognito window:', error);
    }
  }

  browser.contextMenus.onClicked.addListener(genericOnClick);

  browser.runtime.onInstalled.addListener(() => {
    // Supported context types
    const contexts: string[] = [
      'page',
      // 'link',
      // 'image',
      // 'video',
      // 'audio',
    ];

    // Normal new window menu
    for (const context of contexts) {
      browser.contextMenus.create({
        title: i18n.t('menu.newWindow'),
        contexts: [context as Browser.contextMenus.ContextType],
        id: context,
      });
    }

    // Incognito window menu, only shown in page context
    browser.contextMenus.create({
      title: i18n.t('menu.newIncognito'),
      contexts: ['page'],
      id: 'open-incognito',
    });
  });

  // Modify browser toolbar button (browserAction/action) click event to pop the current tab to a new window (or incognito window, can be extended as needed)
  browser.action.onClicked.addListener(async (tab) => {
    console.log(tab);

    if (!tab || !tab.url) {
      console.error('Failed to get current tab or its URL.');
      return;
    }

    try {
      // By default, pop to a normal new window
      await browser.windows.create({
        tabId: tab.id,
        focused: true,
      });
    } catch (error) {
      console.error('Error popping tab to new window:', error);
    }
  });

});
