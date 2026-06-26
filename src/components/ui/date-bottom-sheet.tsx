import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

type DateBottomSheetProps = {
  isPresented: boolean;
  onDismiss: () => void;
  heading: string;
  selectedDate: Date;
  onSelect: (date: Date) => void;
};

const WEEKDAY_LABELS = [
  { key: "sun", label: "Sun" },
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
];

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDate(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function buildCalendarDays(monthStart: Date): Array<Date | null> {
  const firstDayIndex = monthStart.getDay();
  const daysInMonth = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    0,
  ).getDate();

  const cells: Array<Date | null> = [];

  for (let index = 0; index < firstDayIndex; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), day));
  }

  return cells;
}

function chunkCalendarDays(
  days: Array<Date | null>,
): Array<Array<Date | null>> {
  const weeks: Array<Array<Date | null>> = [];

  for (let index = 0; index < days.length; index += 7) {
    const week = days.slice(index, index + 7);

    while (week.length < 7) {
      week.push(null);
    }

    weeks.push(week);
  }

  return weeks;
}

export function DateBottomSheet({
  isPresented,
  onDismiss,
  heading,
  selectedDate,
  onSelect,
}: DateBottomSheetProps) {
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(selectedDate),
  );

  useEffect(() => {
    if (isPresented) {
      setVisibleMonth(startOfMonth(selectedDate));
    }
  }, [isPresented, selectedDate]);

  const calendarDays = useMemo(
    () => buildCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const calendarWeeks = useMemo(
    () => chunkCalendarDays(calendarDays),
    [calendarDays],
  );

  const handleSelect = (date: Date) => {
    onSelect(date);
    onDismiss();
  };

  return (
    <Modal
      visible={isPresented}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        <Pressable
          onPress={onDismiss}
          className="absolute inset-0 bg-tally-text/35"
        />

        <View className="overflow-hidden rounded-t-[28px] bg-tally-background px-5 pb-8 pt-4">
          <View className="mb-4 items-center">
            <View className="h-1.5 w-12 rounded-full bg-tally-groupCircles" />
          </View>

          <Text className="mb-2 text-xl font-semibold text-tally-text">
            {heading}
          </Text>

          <View className="mb-4 flex-row items-center justify-between rounded-2xl bg-white px-4 py-3">
            <Pressable
              onPress={() =>
                setVisibleMonth((currentMonth) => addMonths(currentMonth, -1))
              }
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Previous month"
              className="active:opacity-70"
            >
              <Feather name="chevron-left" size={20} color="#808080" />
            </Pressable>

            <Text className="text-base font-semibold text-tally-text">
              {formatMonthLabel(visibleMonth)}
            </Text>

            <Pressable
              onPress={() =>
                setVisibleMonth((currentMonth) => addMonths(currentMonth, 1))
              }
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Next month"
              className="active:opacity-70"
            >
              <Feather name="chevron-right" size={20} color="#808080" />
            </Pressable>
          </View>

          <View className="rounded-2xl bg-white px-3 py-3">
            <View className="mb-3 flex-row">
              {WEEKDAY_LABELS.map((weekday) => (
                <Text
                  key={weekday.key}
                  className="flex-1 text-center text-xs font-semibold tracking-wider text-tally-textSecondary"
                >
                  {weekday.label}
                </Text>
              ))}
            </View>

            <View className="gap-y-1">
              {calendarWeeks.map((week, weekIndex) => (
                <View key={`week-${weekIndex}`} className="flex-row">
                  {week.map((date, dayIndex) => {
                    if (!date) {
                      return (
                        <View
                          key={`empty-${weekIndex}-${dayIndex}`}
                          className="h-12 flex-1"
                        />
                      );
                    }

                    const isSelected = isSameDate(date, selectedDate);

                    return (
                      <Pressable
                        key={date.toISOString()}
                        onPress={() => handleSelect(date)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                        className="h-12 flex-1 items-center justify-center active:opacity-80"
                      >
                        <View
                          className={`h-10 w-10 items-center justify-center rounded-full ${
                            isSelected ? "bg-tally-primary" : "bg-transparent"
                          }`}
                        >
                          <Text
                            className={`text-sm font-semibold ${
                              isSelected ? "text-white" : "text-tally-text"
                            }`}
                          >
                            {date.getDate()}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
