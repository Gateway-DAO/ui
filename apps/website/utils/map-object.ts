export const getMapValueFromObject = (
  objectToMap,
  errorExtensions,
  defaultValue
) => {
  if (errorExtensions?.error === 'FAILED_QUIZ_MINIMUM_AMOUNT') {
    return formatMinimumAmountMessage(
      errorExtensions,
      objectToMap[errorExtensions.error]
    );
  }
  if (objectToMap) {
    return objectToMap[errorExtensions?.error] || defaultValue;
  }
  return defaultValue;
};

export default function objectToParams(object: {
  [key: string]: string | number | undefined | null;
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return params.length > 0 ? `?${params.join('&')}` : '';
}

const formatMinimumAmountMessage = (
  errorExtensions,
  message: string
): string => {
  let timeMessage = '';
  if (errorExtensions?.timeLeft) {
    const timeLeftSplitted = errorExtensions?.timeLeft.split(':');
    const hours: number = parseInt(timeLeftSplitted[0], 0);
    const minutes: number = parseInt(timeLeftSplitted[1], 0);
    timeMessage = setTimeMinutes(minutes);
    timeMessage = setTimeHours(minutes, hours, timeMessage);
    timeMessage = setTimeDays(hours, timeMessage);
    return `${message} ${timeMessage}.`;
  }
  return `${message} some minutes.`;
};

const setTimeMinutes = (minutes: number): string => {
  return minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';
};

const setTimeHours = (
  minutes: number,
  hours: number,
  timeMessage: string
): string => {
  if (hours > 0 && hours < 48) {
    timeMessage = `${hours} hour${hours > 1 ? 's' : ''}${
      minutes > 0 && hours < 4 ? ` and ${timeMessage}` : timeMessage
    }`;
  }
  return timeMessage;
};

const setTimeDays = (hours: number, timeMessage: string): string => {
  return hours >= 48 ? `${Math.floor(hours / 24)} days` : timeMessage;
};

export const schemaStringToJson = (value: string) => {
  if (!value) return;
  const json = JSON.parse(value);
  delete json.$schema;
  return json;
};
