from aiogram import Router, F
from aiogram.types import Message, CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.enums import ParseMode
from aiogram.fsm.context import FSMContext

router = Router()

# Словарь приветствий
welcome_messages = {
    "ru": {
        "text": (
            "<b>Оставь своё единственное послание человечеству.</b>\n\n"
            "🕯 Оно навсегда останется в <i>The Memorify</i>.\n\n"
            "Без подписи. Без ответа. \n"
            "<i>Лишь момент откровения, застывший в вечности.</i>"
        ),
        "button": "✨ Войти в The Memorify"
    },
    "en": {
        "text": (
            "<b>Leave your one final message to humanity.</b>\n\n"
            "🕯 It will remain forever in <i>The Memorify</i>.\n\n"
            "No name. No reply. \n"
            "<i>Just a moment of truth, frozen in time.</i>"
        ),
        "button": "✨ Enter The Memorify"
    }
}

@router.message(F.text == "/start")
async def start_command(message: Message, state: FSMContext):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="🇷🇺 Русский", callback_data="lang_ru"),
            InlineKeyboardButton(text="🇬🇧 English", callback_data="lang_en")
        ]
    ])
    await message.answer(
        "🌍 <b>Choose your language to enter The Memorify.</b>",
        reply_markup=keyboard,
        parse_mode=ParseMode.HTML
    )

@router.callback_query(F.data.startswith("lang_"))
async def set_language(callback: CallbackQuery, state: FSMContext):
    lang = callback.data.split("_")[1]
    await state.update_data(lang=lang)

    # Отправляем приветствие
    msg = welcome_messages[lang]
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text=msg["button"], web_app={"url": "https://the-memorify-app.vercel.app/"})]
    ])
    await callback.message.edit_text(msg["text"], reply_markup=keyboard, parse_mode=ParseMode.HTML)
    await callback.answer()
