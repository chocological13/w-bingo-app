export const bingoCategoryTemplates = {
  dailyLife: [
    "Drink water",
    "Make your bed",
    "Exercise for 15 mins",
    "Read a book",
    "Call a friend",
    "Meditate",
    "Cook a meal",
    "Clean a room",
    "Take a walk",
    "Learn something new",
    "Practice a hobby",
    "Get 8 hours of sleep",
    "No social media for 2 hours",
    "Write in a journal",
    "Eat a fruit",
    "Stretch",
    "Listen to a podcast",
    "Organize a space",
    "Practice gratitude",
    "Limit screen time",
    "Do a random act of kindness",
    "Try a new recipe",
    "Drink green tea",
    "Plan your week",
    "Compliment someone",
  ],
  productivity: [
    "Complete top 3 tasks",
    "No email for 2 hours",
    "Pomodoro technique",
    "Clear email inbox",
    "Organize to-do list",
    "Learn a new skill",
    "Review goals",
    "Minimize distractions",
    "Time block schedule",
    "Network with a colleague",
    "Read industry article",
    "Update resume",
    "Professional development",
    "Strategic planning",
    "Attend webinar",
    "Deep work session",
    "Review project milestones",
    "Update skills portfolio",
    "Practice public speaking",
    "Mind mapping",
    "Brainstorm solutions",
    "Self-reflection time",
    "Review performance metrics",
    "Skill cross-training",
    "Personal branding",
  ],
  wellness: [
    "Meditate 10 mins",
    "Drink 8 glasses of water",
    "Do yoga",
    "Take vitamins",
    "Get 7-8 hours sleep",
    "Eat balanced meal",
    "No processed food",
    "Skincare routine",
    "Stretch daily",
    "Positive affirmations",
    "Digital detox hour",
    "Deep breathing exercises",
    "Walk 10,000 steps",
    "Try new healthy recipe",
    "Practice mindfulness",
    "Journal emotions",
    "Listen to relaxing music",
    "Avoid caffeine after 2pm",
    "Take mental health break",
    "Connect with nature",
    "Do strength training",
    "Hydrate consistently",
    "Practice good posture",
    "Limit alcohol",
    "Sleep before midnight",
  ],
};

export const generateBingoItems = (
  freeSpace: boolean,
  count: number = 25,
  category?: keyof typeof bingoCategoryTemplates
): string[] => {
  const selectedCategory = category
    ? bingoCategoryTemplates[category]
    : Object.values(bingoCategoryTemplates).flat();

  // Shuffle and take first 'count' items
  return selectedCategory
    .sort(() => 0.5 - Math.random())
    .slice(0, freeSpace ? count - 1 : count);
};

export const generateRandomItems = (
  count: number = 25,
  freeSpace: boolean
): string[] => {
  const baseItems = [
    ...bingoCategoryTemplates.dailyLife,
    ...bingoCategoryTemplates.productivity,
    ...bingoCategoryTemplates.wellness,
  ];

  return baseItems
    .sort(() => 0.5 - Math.random())
    .slice(0, freeSpace ? count - 1 : count);
};
