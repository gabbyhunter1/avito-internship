import { type ChartConfig } from '@/components/ui/chart';

/**
 * Генерирует chartConfig на основе данных
 * @param data - массив данных для графика
 * @param excludeKeys - ключи, которые нужно исключить (например, 'date', 'month', 'id')
 * @param labelMap - опциональный маппинг ключей на читаемые лейблы
 * @param colorMap - опциональный маппинг ключей на цвета (можно использовать hsl, hex, или var(--chart-N))
 */
export function generateChartConfig<T extends Record<string, any>>(
  data: T[],
  excludeKeys: string[] = [],
  labelMap?: Record<string, string>,
  colorMap?: Record<string, string>
): ChartConfig {
  if (!data || data.length === 0) {
    return {} as ChartConfig;
  }

  // Получаем все ключи из первого элемента массива
  const allKeys = Object.keys(data[0]);

  // Фильтруем ключи: убираем excludeKeys и не числовые значения
  const dataKeys = allKeys.filter(key => {
    // Исключаем указанные ключи
    if (excludeKeys.includes(key)) return false;

    // Проверяем, что хотя бы одно значение в массиве - число
    return data.some(item => typeof item[key] === 'number');
  });

  // Генерируем конфиг
  const config: ChartConfig = {};

  dataKeys.forEach((key, index) => {
    config[key] = {
      label: labelMap?.[key] || capitalizeFirstLetter(key),
      color: colorMap?.[key] || `var(--chart-${index + 1})`,
    };
  });

  return config;
}

/**
 * Получает массив ключей данных (для использования в графиках)
 */
export function getDataKeys<T extends Record<string, any>>(data: T[], excludeKeys: string[] = []): string[] {
  if (!data || data.length === 0) {
    return [];
  }

  const allKeys = Object.keys(data[0]);

  return allKeys.filter(key => {
    if (excludeKeys.includes(key)) return false;
    return data.some(item => typeof item[key] === 'number');
  });
}

/**
 * Делает первую букву заглавной
 */
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
