

function addPlugins(config, slot_name, plugins) {
  if (slot_name in config.pluginSlots === false) {
    config.pluginSlots[slot_name] = {
      keepDefault: true,
      plugins: []
    };
  }

  config.pluginSlots[slot_name].plugins.push(...plugins);
}

async function setConfig () {
  let config = {
    pluginSlots: {}
  };

  try {
    /* We can't assume FPF exists, as it's not declared as a dependency in all
     * MFEs, so we import it dynamically. In addition, for dynamic imports to
     * work with Webpack all of the code that actually uses the imported module
     * needs to be inside the `try{}` block.
     */
    const { DIRECT_PLUGIN, PLUGIN_OPERATIONS } = await import('@openedx/frontend-plugin-framework');
    if (process.env.APP_ID == 'admin-console') {
    }
    if (process.env.APP_ID == 'authn') {
    }
    if (process.env.APP_ID == 'authoring') {// wutiskill-ai: Import chat widget components for Authoring MFE
const { AIChatTray, CourseGenerationButton } = await import('@wutiskill/ai-chat-widget');

// wutiskill-ai: MFE env config for Authoring (Studio) MFE
window.WUTISKILL_AI_CONFIG = {
  ENABLE: 'true',
  ENABLE_CHAT: 'true',
  ENABLE_COURSE_CREATION: 'false',
  LMS_BASE_URL: 'https://local.openedx.io',
  CMS_BASE_URL: 'https://studio.local.openedx.io',
};
      addPlugins(config, 'org.openedx.frontend.layout.studio_footer.v1', [
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'wutiskill_ai_chat_widget_authoring',
                    priority: 50,
                    type: DIRECT_PLUGIN,
                    RenderWidget: AIChatTray,
                },
            }]);
      addPlugins(config, 'org.openedx.frontend.authoring.course_outline_header_actions.v1', [
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'wutiskill_ai_course_generation_button',
                    priority: 60,
                    type: DIRECT_PLUGIN,
                    RenderWidget: CourseGenerationButton,
                },
            }]);
    }
    if (process.env.APP_ID == 'account') {
    }
    if (process.env.APP_ID == 'communications') {
    }
    if (process.env.APP_ID == 'discussions') {
    }
    if (process.env.APP_ID == 'gradebook') {
    }
    if (process.env.APP_ID == 'learner-dashboard') {
    }
    if (process.env.APP_ID == 'learning') {// wutiskill-ai: Import chat widget components for Learning MFE
const { AIChatTray } = await import('@wutiskill/ai-chat-widget');

// wutiskill-ai: MFE env config for Learning MFE
window.WUTISKILL_AI_CONFIG = {
  ENABLE: 'true',
  ENABLE_CHAT: 'true',
  LMS_BASE_URL: 'https://local.openedx.io',
};
      addPlugins(config, 'org.openedx.frontend.layout.footer.v1', [
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'wutiskill_ai_chat_widget_learning',
                    priority: 50,
                    type: DIRECT_PLUGIN,
                    RenderWidget: AIChatTray,
                },
            }]);
    }
    if (process.env.APP_ID == 'ora-grading') {
    }
    if (process.env.APP_ID == 'profile') {
    }
  } catch (err) { console.error("env.config.jsx failed to apply: ", err);}

  return config;
}

export default setConfig;
