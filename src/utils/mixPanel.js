import mixpanel from "mixpanel-browser";

export const mixPanelTracking = (key, details = {}) => {
  mixpanel.init("7c24839ab8b124fe3c241da4b4c3e5ae");
  mixpanel.track(key, details);
};
