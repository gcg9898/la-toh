import './Villains.scss';

import { AuraCommands, BaseCarousel, Footer, screenReady, useAura, useBackground } from '@telefonica/la-web-sdk';
import React, { useCallback, useEffect } from 'react';
import { Intent, Villain, VillainsScreenMessage } from '../../../../../dialogs/src/models';
import { VillainComponent } from './villain';
import Button from '../../component/button';

export const VillainsScreen: React.FC<VillainsScreenMessage> = (data: VillainsScreenMessage) => {
    const { clearBackground, setBackgroundColor } = useBackground();
    const { sendCommand } = useAura();

    useEffect(() => {
        clearBackground();
    }, [clearBackground]);

    const onVillainFocus = useCallback(
        (villain: Villain, e: Event) => {
            const element = e.target as HTMLElement;
            const parent = element.parentElement;
            const clientRect = element.getBoundingClientRect();
            if (parent && clientRect.left <= 0) {
                parent.scrollBy({
                    behavior: 'smooth',
                    left: clientRect.left - parseInt(window.getComputedStyle(parent).paddingLeft.replace('px', '')),
                });
            }
            if (parent && clientRect.right >= document.documentElement.clientWidth) {
                parent.scrollBy({
                    behavior: 'smooth',
                    left:
                        clientRect.right -
                        document.documentElement.clientWidth +
                        parseInt(window.getComputedStyle(parent).paddingRight.replace('px', '')),
                });
            }
            setBackgroundColor(villain.bgColor);
        },
        [setBackgroundColor],
    );

    const goBack = useCallback(() => {
        sendCommand(AuraCommands.getBack());
    }, [sendCommand]);

    const goToHeroes = useCallback(() => {
        sendCommand(AuraCommands.getAuraCommand(Intent.HEROES));
    }, [sendCommand]);

    return (
        <div id="villains">
            <h1 id="title"> {data.title}</h1>
            <BaseCarousel className="villains-carousel">
                {data.villains.map((villain: Villain, index: number) => (
                    <VillainComponent
                        key={index}
                        villain={villain}
                        current={index}
                        onFocus={onVillainFocus}
                        defaultFocused={index === 0}
                    />
                ))}
            </BaseCarousel>
            <Footer>
                <Button id="back-button" text={data.options[0]} onClick={goBack} />
                <Button id="heroes-button" text={data.options[1]} onClick={goToHeroes} />
            </Footer>
        </div>
    );
};

export default screenReady(VillainsScreen);
