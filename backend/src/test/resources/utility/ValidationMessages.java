package ru.ifmo.is.backend.utility;

public final class ValidationMessages {

    public static final String REQUIRED = "Поле обязательно для заполнения";
    public static final String NOT_BLANK = "Строка не может быть пустой";
    public static final String POSITIVE = "Значение должно быть больше 0";
    public static final String MAX_LENGTH_255 = "Длина строки не должна превышать 255 символов";
    public static final String MAX_LENGTH_1000 = "Длина строки не должна превышать 1000 символов";

    public static final String COORDINATES_X_MIN = "Значение должно быть больше -404";
    public static final String COORDINATES_Y_MAX = "Значение не может быть больше 851";

    public static final String NOT_BLANK_REGEX = "(?s).*\\S.*";

    private ValidationMessages() {
    }
}
